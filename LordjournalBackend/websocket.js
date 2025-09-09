const { Server } = require('socket.io');

let io = null;

const initializeWebSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*", // In production, specify your frontend URL
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Join user to their personal room based on email
    socket.on('join-user-room', (userEmail) => {
      if (userEmail) {
        socket.join(`user-${userEmail}`);
        console.log(`User ${userEmail} joined their room`);
      }
    });

    // Join admin to admin room
    socket.on('join-admin-room', (adminEmail) => {
      if (adminEmail) {
        socket.join('admin-room');
        console.log(`Admin ${adminEmail} joined admin room`);
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error('WebSocket not initialized. Call initializeWebSocket first.');
  }
  return io;
};

// Function to emit status update to specific user
const emitStatusUpdate = (userEmail, submissionData) => {
  if (io) {
    io.to(`user-${userEmail}`).emit('submission-status-updated', {
      submissionId: submissionData.id,
      status: submissionData.status,
      paperTitle: submissionData.paperTitle,
      journalName: submissionData.journalName,
      updatedAt: submissionData.updatedAt
    });
    console.log(`Status update emitted to user: ${userEmail}`);
  }
};

// Function to emit status update to all admins
const emitStatusUpdateToAdmins = (submissionData) => {
  if (io) {
    io.to('admin-room').emit('submission-status-updated', {
      submissionId: submissionData.id,
      status: submissionData.status,
      paperTitle: submissionData.paperTitle,
      journalName: submissionData.journalName,
      authorEmail: submissionData.authorEmail,
      updatedAt: submissionData.updatedAt
    });
    console.log('Status update emitted to all admins');
  }
};

module.exports = {
  initializeWebSocket,
  getIO,
  emitStatusUpdate,
  emitStatusUpdateToAdmins
};
