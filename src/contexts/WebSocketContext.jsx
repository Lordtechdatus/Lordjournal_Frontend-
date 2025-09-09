import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import pollingService from '../services/pollingService';

const WebSocketContext = createContext();

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [usePolling, setUsePolling] = useState(false);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io(process.env.NODE_ENV === 'production' 
      ? 'https://your-backend-domain.com' 
      : 'http://localhost:3000', {
      autoConnect: true,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
      timeout: 20000,
    });

    newSocket.on('connect', () => {
      console.log('WebSocket connected:', newSocket.id);
      setIsConnected(true);
      setUsePolling(false);
      // Stop polling if WebSocket connects
      pollingService.stopAllPolling();
    });

    newSocket.on('disconnect', () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
    });

    newSocket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      setIsConnected(false);
      setUsePolling(true);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
      pollingService.stopAllPolling();
    };
  }, []);

  const joinUserRoom = (userEmail) => {
    if (socket && userEmail) {
      socket.emit('join-user-room', userEmail);
    }
    
    // Start polling as fallback if WebSocket is not connected
    if (usePolling && userEmail) {
      pollingService.startUserPolling(userEmail, (userData) => {
        // This will be handled by the component that calls this
        console.log('Polling received user data:', userData);
      });
    }
  };

  const joinAdminRoom = (adminEmail) => {
    if (socket && adminEmail) {
      socket.emit('join-admin-room', adminEmail);
    }
    
    // Start polling as fallback if WebSocket is not connected
    if (usePolling && adminEmail) {
      pollingService.startAdminPolling(adminEmail, (adminData) => {
        // This will be handled by the component that calls this
        console.log('Polling received admin data:', adminData);
      });
    }
  };

  const onSubmissionStatusUpdate = (callback) => {
    if (socket) {
      socket.on('submission-status-updated', callback);
    }
  };

  const offSubmissionStatusUpdate = (callback) => {
    if (socket) {
      socket.off('submission-status-updated', callback);
    }
  };

  const value = {
    socket,
    isConnected,
    usePolling,
    joinUserRoom,
    joinAdminRoom,
    onSubmissionStatusUpdate,
    offSubmissionStatusUpdate,
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};
