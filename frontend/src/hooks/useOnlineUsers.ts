// frontend/src/hooks/useOnlineUsers.ts
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';

interface OnlineUser {
  id: string;
  name: string;
  lastActive: string;
  status: string;
  rank: string;
}

export const useOnlineUsers = () => {
  const { user } = useAuth();
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setOnlineUsers([]);
      setIsLoading(false);
      return;
    }

    let heartbeatInterval: NodeJS.Timeout;
    let fetchInterval: NodeJS.Timeout;

    // Send heartbeat every 30 seconds
    const sendHeartbeat = async () => {
      try {
        await api.post('/lobby/heartbeat');
      } catch (error) {
        console.error('Heartbeat failed:', error);
      }
    };

    // Fetch online users every 10 seconds
    const fetchOnlineUsers = async () => {
      try {
        const response = await api.get('/lobby/online-users');
        setOnlineUsers(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch online users:', error);
        setIsLoading(false);
      }
    };

    // Initial fetch
    fetchOnlineUsers();
    sendHeartbeat();

    // Set up intervals
    heartbeatInterval = setInterval(sendHeartbeat, 30000); // 30 seconds
    fetchInterval = setInterval(fetchOnlineUsers, 10000);  // 10 seconds

    // Set user online immediately
    api.post('/lobby/heartbeat').catch(console.error);

    // Cleanup function
    return () => {
      clearInterval(heartbeatInterval);
      clearInterval(fetchInterval);
      
      // Set user offline when leaving
      api.post('/lobby/set-offline').catch(console.error);
    };
  }, [user]);

  // Set offline when page unloads
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (user) {
        // Use sendBeacon for reliable offline status
        navigator.sendBeacon('/api/lobby/set-offline', JSON.stringify({}));
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [user]);

  return { onlineUsers, isLoading };
};