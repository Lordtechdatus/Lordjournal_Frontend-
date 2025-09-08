import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../server/FetchNodeAdmin';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [submissions, setSubmissions] = useState([]);
  const [filters, setFilters] = useState({
    journal: '',
    status: '',
    dateFrom: '',
    dateTo: '',
    search: ''
  });
  const [sorting, setSorting] = useState({
    field: 'submission_date',
    order: 'DESC'
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });
  const [stats, setStats] = useState({
    totalSubmissions: 0,
    statusBreakdown: [],
    topJournals: [],
    recentSubmissions: [],
    monthlyTrends: []
  });
  const [isLoadingSubmissions, setIsLoadingSubmissions] = useState(false);
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  const [error, setError] = useState('');

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      const authToken = localStorage.getItem('adminAuthToken');
      const userEmail = localStorage.getItem('userEmail');
      const adminRole = localStorage.getItem('adminRole');
      
      if (!authToken || !userEmail || !adminRole) {
        navigate('/admin-login');
        return;
      }
      
      setIsAuthenticated(true);
      setIsLoading(false);
    };

    checkAuth();
  }, [navigate]);

  // Fetch submissions when filters, sorting, or pagination changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchSubmissions();
    }
  }, [isAuthenticated, filters, sorting, pagination.currentPage]);

  // Fetch dashboard stats
  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardStats();
    }
  }, [isAuthenticated]);

  const fetchSubmissions = async () => {
    setIsLoadingSubmissions(true);
    setError('');
    
    try {
      const authToken = localStorage.getItem('adminAuthToken');
      const adminEmail = localStorage.getItem('userEmail');
      const queryParams = new URLSearchParams({
        page: pagination.currentPage,
        limit: pagination.itemsPerPage,
        journal: filters.journal,
        status: filters.status,
        dateFrom: filters.dateFrom,
        dateTo: filters.dateTo,
        search: filters.search,
        sortBy: sorting.field,
        sortOrder: sorting.order,
        email: adminEmail // Add admin email to query params
      });

      const response = await fetch(`/api/admin/submissions?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setSubmissions(data.data.submissions);
        setPagination(data.data.pagination);
      } else {
        setError(data.message || 'Failed to fetch submissions');
      }
      } catch (error) {
    setError('Failed to fetch submissions. Please try again.');
  } finally {
      setIsLoadingSubmissions(false);
    }
  };

  const fetchDashboardStats = async () => {
    setIsLoadingStats(true);
    
    try {
      const authToken = localStorage.getItem('adminAuthToken');
      const adminEmail = localStorage.getItem('userEmail');
      const response = await fetch(`/api/admin/dashboard/stats?email=${adminEmail}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      // Error fetching dashboard stats
    } finally {
      setIsLoadingStats(false);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
    setPagination(prev => ({ ...prev, currentPage: 1 })); // Reset to first page
  };

  const handleSort = (field) => {
    setSorting(prev => ({
      field,
      order: prev.field === field && prev.order === 'ASC' ? 'DESC' : 'ASC'
    }));
  };

  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  const handleStatusUpdate = async (submissionId, newStatus) => {
    try {
      const authToken = localStorage.getItem('adminAuthToken');
      const adminEmail = localStorage.getItem('userEmail');
      const response = await fetch(`/api/admin/submissions/${submissionId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          status: newStatus,
          email: adminEmail // Add admin email to request body
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.success) {
        // Update the submission in the local state
        setSubmissions(prev => 
          prev.map(sub => 
            sub.id === submissionId 
              ? { ...sub, status: newStatus, updated_at: new Date().toISOString() }
              : sub
          )
        );
        
        // Refresh stats
        fetchDashboardStats();
      }
    } catch (error) {
      setError('Failed to update status. Please try again.');
    }
  };

  const handleDownload = async (submissionId, fileName) => {
    try {
      const authToken = localStorage.getItem('adminAuthToken');
      const adminEmail = localStorage.getItem('userEmail');
      const response = await fetch(`/api/admin/submissions/${submissionId}/download?email=${adminEmail}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      // Create blob and download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName || 'paper';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      setError('Failed to download file. Please try again.');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      submitted: 'bg-blue-100 text-blue-800',
      under_review: 'bg-yellow-100 text-yellow-800',
      accepted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      published: 'bg-purple-100 text-purple-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="admin-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage paper submissions and review process</p>
      </div>

      {/* Dashboard Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-number">{stats.totalSubmissions}</div>
            <div className="stat-label">Total Submissions</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <div className="stat-number">
              {stats.statusBreakdown.find(s => s.status === 'submitted')?.count || 0}
            </div>
            <div className="stat-label">New Submissions</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <div className="stat-number">
              {stats.statusBreakdown.find(s => s.status === 'under_review')?.count || 0}
            </div>
            <div className="stat-label">Under Review</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-number">
              {stats.statusBreakdown.find(s => s.status === 'published')?.count || 0}
            </div>
            <div className="stat-label">Published</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="filters-grid">
          <div className="filter-group">
            <label>Search</label>
            <input
              type="text"
              placeholder="Search by user name or paper title..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="filter-input"
            />
          </div>
          
          <div className="filter-group">
            <label>Journal</label>
            <select
              value={filters.journal}
              onChange={(e) => handleFilterChange('journal', e.target.value)}
              className="filter-select"
            >
              <option value="">All Journals</option>
              {stats.journals?.map(journal => (
                <option key={journal} value={journal}>{journal}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Status</label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="filter-select"
            >
              <option value="">All Statuses</option>
              {stats.statuses?.map(status => (
                <option key={status} value={status}>
                  {status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Date From</label>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
              className="filter-input"
            />
          </div>
          
          <div className="filter-group">
            <label>Date To</label>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => handleFilterChange('dateTo', e.target.value)}
              className="filter-input"
            />
          </div>
          
          <div className="filter-group">
            <label>Items per page</label>
            <select
              value={pagination.itemsPerPage}
              onChange={(e) => {
                setPagination(prev => ({ ...prev, itemsPerPage: parseInt(e.target.value), currentPage: 1 }));
              }}
              className="filter-select"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="submissions-section">
        <div className="section-header">
          <h2>Paper Submissions</h2>
          {isLoadingSubmissions && <div className="loading-indicator">Loading...</div>}
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="table-container">
          <table className="submissions-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('submission_date')} className="sortable">
                  Date
                  {sorting.field === 'submission_date' && (
                    <span className="sort-indicator">
                      {sorting.order === 'ASC' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
                <th onClick={() => handleSort('given_names')} className="sortable">
                  Author
                  {sorting.field === 'given_names' && (
                    <span className="sort-indicator">
                      {sorting.order === 'ASC' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
                <th onClick={() => handleSort('paper_title')} className="sortable">
                  Paper Title
                  {sorting.field === 'paper_title' && (
                    <span className="sort-indicator">
                      {sorting.order === 'ASC' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
                <th onClick={() => handleSort('journal_name')} className="sortable">
                  Journal
                  {sorting.field === 'journal_name' && (
                    <span className="sort-indicator">
                      {sorting.order === 'ASC' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
                <th onClick={() => handleSort('status')} className="sortable">
                  Status
                  {sorting.field === 'status' && (
                    <span className="sort-indicator">
                      {sorting.order === 'ASC' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map(submission => (
                <tr key={submission.id}>
                  <td>{formatDate(submission.submission_date)}</td>
                  <td>
                    <div className="author-info">
                      <div className="author-name">
                        {submission.given_names} {submission.family_name}
                      </div>
                      <div className="author-email">{submission.email}</div>
                    </div>
                  </td>
                  <td>
                    <div className="paper-title">{submission.paper_title}</div>
                  </td>
                  <td>
                    <div className="journal-info">
                      <span className="journal-icon">{submission.journal_icon}</span>
                      <span className="journal-name">{submission.journal_name}</span>
                    </div>
                  </td>
                  <td>
                    <select
                      value={submission.status}
                      onChange={(e) => handleStatusUpdate(submission.id, e.target.value)}
                      className={`status-select ${getStatusColor(submission.status)}`}
                    >
                      <option value="submitted">Submitted</option>
                      <option value="under_review">Under Review</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                      <option value="published">Published</option>
                    </select>
                  </td>
                                     <td>
                     <div className="action-buttons">
                       {submission.file_path ? (
                         <button
                           onClick={() => handleDownload(submission.id, submission.paper_title)}
                           className="action-btn download-btn"
                           title="Download Paper"
                         >
                           📥 Download
                         </button>
                       ) : (
                         <span className="no-file-indicator" title="No file attached">
                           📄 No File
                         </span>
                       )}
                       <button
                         onClick={() => {
                           // You can implement a detailed view modal here
                           alert(`Viewing details for: ${submission.paper_title}`);
                         }}
                         className="action-btn view-btn"
                         title="View Details"
                       >
                         👁️ View
                       </button>
                     </div>
                   </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className="pagination-btn"
            >
              Previous
            </button>
            
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`pagination-btn ${page === pagination.currentPage ? 'active' : ''}`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
              className="pagination-btn"
            >
              Next
            </button>
          </div>
        )}

        <div className="pagination-info">
          Showing {((pagination.currentPage - 1) * pagination.itemsPerPage) + 1} to{' '}
          {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} of{' '}
          {pagination.totalItems} submissions
        </div>
      </div>

      <style jsx>{`
        .admin-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 120px 20px 40px;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          min-height: 100vh;
          background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(240,242,247,0.9) 100%);
        }

        .admin-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .admin-header h1 {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(45deg, #0052cc, #4285f4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 10px;
        }

        .admin-header p {
          color: #666;
          font-size: 1.1rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .stat-card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          display: flex;
          align-items: center;
          gap: 15px;
          transition: transform 0.2s ease;
        }

        .stat-card:hover {
          transform: translateY(-2px);
        }

        .stat-icon {
          font-size: 2rem;
        }

        .stat-number {
          font-size: 1.8rem;
          font-weight: 700;
          color: #0052cc;
        }

        .stat-label {
          color: #666;
          font-size: 0.9rem;
        }

        .filters-section {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          margin-bottom: 30px;
        }

        .filters-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .filter-group label {
          font-weight: 600;
          color: #333;
          font-size: 0.9rem;
        }

        .filter-input, .filter-select {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 0.9rem;
        }

        .filter-input:focus, .filter-select:focus {
          outline: none;
          border-color: #0052cc;
          box-shadow: 0 0 0 3px rgba(0,82,204,0.1);
        }

        .submissions-section {
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          overflow: hidden;
        }

        .section-header {
          padding: 20px;
          border-bottom: 1px solid #eee;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .section-header h2 {
          margin: 0;
          color: #333;
        }

        .loading-indicator {
          color: #666;
          font-style: italic;
        }

        .error-message {
          background: #fee;
          color: #c33;
          padding: 15px 20px;
          border-radius: 6px;
          margin: 20px;
          border: 1px solid #fcc;
        }

        .table-container {
          overflow-x: auto;
        }

        .submissions-table {
          width: 100%;
          border-collapse: collapse;
        }

        .submissions-table th,
        .submissions-table td {
          padding: 12px 15px;
          text-align: left;
          border-bottom: 1px solid #eee;
        }

        .submissions-table th {
          background: #f8f9fa;
          font-weight: 600;
          color: #333;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .sortable {
          cursor: pointer;
          user-select: none;
        }

        .sortable:hover {
          background: #e9ecef;
        }

        .sort-indicator {
          margin-left: 5px;
          color: #0052cc;
        }

        .author-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .author-name {
          font-weight: 500;
          color: #333;
        }

        .author-email {
          font-size: 0.8rem;
          color: #666;
        }

        .paper-title {
          font-weight: 500;
          color: #333;
          max-width: 300px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .journal-info {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .journal-icon {
          font-size: 1.2rem;
        }

        .journal-name {
          font-size: 0.9rem;
          color: #333;
        }

        .status-select {
          padding: 4px 8px;
          border: none;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
        }

        .action-buttons {
          display: flex;
          gap: 8px;
        }

        .action-btn {
          padding: 6px 12px;
          border: none;
          border-radius: 4px;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .download-btn {
          background: #10b981;
          color: white;
        }

        .download-btn:hover {
          background: #059669;
        }

        .view-btn {
          background: #3b82f6;
          color: white;
        }

        .view-btn:hover {
          background: #2563eb;
        }
        
        .no-file-indicator {
          padding: 6px 12px;
          background: #f3f4f6;
          color: #6b7280;
          border-radius: 4px;
          font-size: 0.8rem;
          cursor: not-allowed;
          opacity: 0.7;
        }

        .pagination {
          display: flex;
          justify-content: center;
          gap: 10px;
          padding: 20px;
          border-top: 1px solid #eee;
        }

        .pagination-btn {
          padding: 8px 12px;
          border: 1px solid #ddd;
          background: white;
          color: #333;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .pagination-btn:hover:not(:disabled) {
          background: #f8f9fa;
          border-color: #0052cc;
        }

        .pagination-btn.active {
          background: #0052cc;
          color: white;
          border-color: #0052cc;
        }

        .pagination-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .pagination-info {
          text-align: center;
          padding: 15px 20px;
          color: #666;
          font-size: 0.9rem;
          border-top: 1px solid #eee;
        }

        .loading-spinner {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 400px;
          gap: 20px;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #0052cc;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .admin-container {
            padding: 100px 15px 30px;
          }

          .filters-grid {
            grid-template-columns: 1fr;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .action-buttons {
            flex-direction: column;
            gap: 5px;
          }

          .paper-title {
            max-width: 200px;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
