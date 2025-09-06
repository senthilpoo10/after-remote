// pong-app/backend/src/routes/lobby.ts
// Lobby-specific API endpoints
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../utils/auth';

interface LobbyRoutesOptions {
  prisma: PrismaClient;
}

export default function lobbyRoutes(fastify: FastifyInstance, options: LobbyRoutesOptions) {
  const { prisma } = options;

  // Middleware to verify authentication
  const authenticate = async (request: FastifyRequest, reply: FastifyReply) => {
    const token = request.cookies.authToken;
    
    if (!token) {
      return reply.status(401).send({ message: 'Authentication required' });
    }

    try {
      const decoded = verifyToken(token) as { userId: string };
      const user = await prisma.user.findUnique({ 
        where: { id: decoded.userId },
        select: { id: true, name: true, email: true, isVerified: true }
      });
      
      if (!user) {
        return reply.status(401).send({ message: 'User not found' });
      }
      
      // Add user to request object
      (request as any).user = user;
    } catch (err) {
      return reply.status(401).send({ message: 'Invalid token' });
    }
  };

  // Get user game statistics
  fastify.get('/lobby/stats', {
    preHandler: authenticate
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = (request as any).user;
      
      let gameStats = await prisma.gameStats.findUnique({
        where: { userId: user.id }
      });

      // Create game stats if they don't exist
      if (!gameStats) {
        gameStats = await prisma.gameStats.create({
          data: {
            userId: user.id,
            totalMatches: 0,
            wins: 0,
            losses: 0,
            draws: 0
          }
        });
      }

      // Calculate win rate
      const winRate = gameStats.totalMatches > 0 
        ? Math.round((gameStats.wins / gameStats.totalMatches) * 100) 
        : 0;

      return reply.send({
        ...gameStats,
        winRate
      });

    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({
        error: 'STATS_FETCH_FAILED',
        message: 'Failed to fetch game statistics'
      });
    }
  });

  // Get user's friends list with online status
  fastify.get('/lobby/friends', {
    preHandler: authenticate
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = (request as any).user;
      
      const userWithFriends = await prisma.user.findUnique({
        where: { id: user.id },
        include: {
          friends: {
            select: {
              id: true,
              name: true,
              status: true,
              lastActive: true,
              rank: true,
              avatarUrl: true
            }
          }
        }
      });

      const friends = userWithFriends?.friends || [];
      
      // Format friends data with last seen
      const formattedFriends = friends.map(friend => ({
        ...friend,
        lastSeen: friend.status === 'OFFLINE' 
          ? formatLastSeen(friend.lastActive) 
          : null
      }));

      return reply.send(formattedFriends);

    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({
        error: 'FRIENDS_FETCH_FAILED',
        message: 'Failed to fetch friends list'
      });
    }
  });

  // Get recent matches
  fastify.get('/lobby/matches/recent', {
    preHandler: authenticate
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = (request as any).user;
      
      const matches = await prisma.match.findMany({
        where: {
          OR: [
            { player1Id: user.id },
            { player2Id: user.id }
          ],
          status: 'COMPLETED'
        },
        include: {
          player1: { select: { id: true, name: true } },
          player2: { select: { id: true, name: true } },
          winner: { select: { id: true, name: true } }
        },
        orderBy: { completedAt: 'desc' },
        take: 10
      });

      const formattedMatches = matches.map(match => {
        const isPlayer1 = match.player1Id === user.id;
        const opponent = isPlayer1 ? match.player2 : match.player1;
        
        let result: 'win' | 'loss' | 'draw' = 'draw';
        if (match.winnerId) {
          result = match.winnerId === user.id ? 'win' : 'loss';
        }

        return {
          id: match.id,
          opponent: opponent.name,
          result,
          score: `${isPlayer1 ? match.player1Score : match.player2Score}-${isPlayer1 ? match.player2Score : match.player1Score}`,
          date: formatDate(match.completedAt || match.date),
          duration: match.duration || 0,
          matchType: match.matchType
        };
      });

      return reply.send(formattedMatches);

    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({
        error: 'MATCHES_FETCH_FAILED',
        message: 'Failed to fetch recent matches'
      });
    }
  });

  // Send friend request
  fastify.post<{ Body: { username: string } }>('/lobby/friends/request', {
    preHandler: authenticate,
    schema: {
      body: {
        type: 'object',
        required: ['username'],
        properties: {
          username: { type: 'string' }
        }
      }
    }
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = (request as any).user;
      const { username } = request.body as { username: string };

      // Find the target user
      const targetUser = await prisma.user.findUnique({
        where: { name: username }
      });

      if (!targetUser) {
        return reply.status(404).send({
          error: 'USER_NOT_FOUND',
          message: 'User not found'
        });
      }

      if (targetUser.id === user.id) {
        return reply.status(400).send({
          error: 'SELF_FRIEND_REQUEST',
          message: 'Cannot send friend request to yourself'
        });
      }

      // Check if they're already friends
      const existingFriendship = await prisma.user.findFirst({
        where: {
          id: user.id,
          friends: {
            some: { id: targetUser.id }
          }
        }
      });

      if (existingFriendship) {
        return reply.status(400).send({
          error: 'ALREADY_FRIENDS',
          message: 'You are already friends with this user'
        });
      }

      // Check for existing pending request
      const existingRequest = await prisma.friendRequest.findUnique({
        where: {
          senderId_receiverId: {
            senderId: user.id,
            receiverId: targetUser.id
          }
        }
      });

      if (existingRequest) {
        return reply.status(400).send({
          error: 'REQUEST_ALREADY_SENT',
          message: 'Friend request already sent'
        });
      }

      // Create friend request
      const friendRequest = await prisma.friendRequest.create({
        data: {
          senderId: user.id,
          receiverId: targetUser.id,
          status: 'PENDING'
        }
      });

      return reply.send({
        success: true,
        message: `Friend request sent to ${username}`
      });

    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({
        error: 'FRIEND_REQUEST_FAILED',
        message: 'Failed to send friend request'
      });
    }
  });

  // Challenge a friend
  fastify.post<{ Body: { opponentId: string } }>('/lobby/challenge', {
    preHandler: authenticate,
    schema: {
      body: {
        type: 'object',
        required: ['opponentId'],
        properties: {
          opponentId: { type: 'string' }
        }
      }
    }
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = (request as any).user;
      const { opponentId } = request.body as { opponentId: string };

      // Verify opponent exists and is a friend
      const opponent = await prisma.user.findFirst({
        where: {
          id: opponentId,
          friends: {
            some: { id: user.id }
          }
        }
      });

      if (!opponent) {
        return reply.status(404).send({
          error: 'OPPONENT_NOT_FOUND',
          message: 'Opponent not found or not in your friends list'
        });
      }

      // Check if opponent is online
      if (opponent.status === 'OFFLINE') {
        return reply.status(400).send({
          error: 'OPPONENT_OFFLINE',
          message: 'Cannot challenge offline player'
        });
      }

      // Create a pending match
      const match = await prisma.match.create({
        data: {
          player1Id: user.id,
          player2Id: opponentId,
          matchType: 'FRIENDLY',
          status: 'SCHEDULED'
        }
      });

      // Create notification for opponent
      await prisma.notification.create({
        data: {
          userId: opponentId,
          title: 'Challenge Received!',
          message: `${user.name} has challenged you to a match!`,
          type: 'CHALLENGE',
          data: JSON.stringify({ matchId: match.id })
        }
      });

      return reply.send({
        success: true,
        message: `Challenge sent to ${opponent.name}`,
        matchId: match.id
      });

    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({
        error: 'CHALLENGE_FAILED',
        message: 'Failed to send challenge'
      });
    }
  });

  // Update user status
  fastify.put<{ Body: { status: string } }>('/lobby/status', {
    preHandler: authenticate,
    schema: {
      body: {
        type: 'object',
        required: ['status'],
        properties: {
          status: { 
            type: 'string',
            enum: ['ONLINE', 'OFFLINE', 'IN_GAME', 'AWAY']
          }
        }
      }
    }
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = (request as any).user;
      const { status } = request.body as { status: string };

      await prisma.user.update({
        where: { id: user.id },
        data: { 
          status: status as any,
          lastActive: new Date()
        }
      });

      return reply.send({
        success: true,
        message: 'Status updated successfully'
      });

    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({
        error: 'STATUS_UPDATE_FAILED',
        message: 'Failed to update status'
      });
    }
  });

  // Get notifications
  fastify.get('/lobby/notifications', {
    preHandler: authenticate
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = (request as any).user;
      
      const notifications = await prisma.notification.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
        take: 20
      });

      return reply.send(notifications);

    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({
        error: 'NOTIFICATIONS_FETCH_FAILED',
        message: 'Failed to fetch notifications'
      });
    }
  });
}

// Helper functions
function formatLastSeen(lastActive: Date): string {
  const now = new Date();
  const diff = now.getTime() - lastActive.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 60) {
    return `${minutes}m ago`;
  } else if (hours < 24) {
    return `${hours}h ago`;
  } else {
    return `${days}d ago`;
  }
}

function formatDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days === 1) {
    return 'yesterday';
  } else {
    return `${days} days ago`;
  }
}