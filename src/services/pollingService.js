// Polling service as fallback for WebSocket
class PollingService {
  constructor() {
    this.intervals = new Map();
    this.isPolling = false;
  }

  // Start polling for user profile updates
  startUserPolling(userEmail, callback, interval = 30000) { // 30 seconds default
    if (this.intervals.has('user')) {
      this.stopUserPolling();
    }

    const pollUserData = async () => {
      try {
        const authToken = localStorage.getItem('adminAuthToken');
        if (!authToken || !userEmail) return;

        // Check for new submissions or status updates
        const response = await fetch(`/api/users/profile?email=${userEmail}`, {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.user) {
            callback(data.user);
          }
        }
      } catch (error) {
        console.error('Polling error:', error);
      }
    };

    // Poll immediately, then at intervals
    pollUserData();
    const intervalId = setInterval(pollUserData, interval);
    this.intervals.set('user', intervalId);
    this.isPolling = true;
  }

  // Start polling for admin dashboard updates
  startAdminPolling(adminEmail, callback, interval = 30000) { // 30 seconds default
    if (this.intervals.has('admin')) {
      this.stopAdminPolling();
    }

    const pollAdminData = async () => {
      try {
        const authToken = localStorage.getItem('adminAuthToken');
        if (!authToken || !adminEmail) return;

        // Check for new submissions or status updates
        const response = await fetch(`/api/admin/dashboard/stats?email=${adminEmail}`, {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            callback(data.data);
          }
        }
      } catch (error) {
        console.error('Admin polling error:', error);
      }
    };

    // Poll immediately, then at intervals
    pollAdminData();
    const intervalId = setInterval(pollAdminData, interval);
    this.intervals.set('admin', intervalId);
    this.isPolling = true;
  }

  // Stop user polling
  stopUserPolling() {
    const intervalId = this.intervals.get('user');
    if (intervalId) {
      clearInterval(intervalId);
      this.intervals.delete('user');
    }
  }

  // Stop admin polling
  stopAdminPolling() {
    const intervalId = this.intervals.get('admin');
    if (intervalId) {
      clearInterval(intervalId);
      this.intervals.delete('admin');
    }
  }

  // Stop all polling
  stopAllPolling() {
    this.intervals.forEach((intervalId) => {
      clearInterval(intervalId);
    });
    this.intervals.clear();
    this.isPolling = false;
  }

  // Check if polling is active
  isActive() {
    return this.isPolling;
  }
}

// Create singleton instance
const pollingService = new PollingService();

export default pollingService;
