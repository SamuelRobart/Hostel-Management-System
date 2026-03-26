'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, Plus, Clock, CheckCircle, X, Lock } from 'lucide-react';

interface Issue {
  _id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  priority: string;
  createdAt: string;
  assignedTo?: { name: string };
}

interface User {
  id: string;
  name: string;
  role: string;
  hostelId?: string;
  hostelLocation?: string;
}

export default function StudentIssues() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [newIssue, setNewIssue] = useState({
    title: '',
    description: '',
    category: 'maintenance',
    priority: 'medium'
  });
  const router = useRouter();

  useEffect(() => {
    fetchUserInfo();
    fetchIssues();
  }, []);

  // Check if user is a student (role-based access control)
  useEffect(() => {
    if (user && user.role !== 'student') {
      // Non-students cannot access this page
      router.push('/login');
    }
  }, [user, router]);

  const fetchUserInfo = async () => {
    try {
      const res = await fetch('/api/auth/me', {
        credentials: 'include'
      });

      if (res.status === 401) {
        router.push('/student-login');
        return;
      }

      const data = await res.json();
      if (data.success && data.data) {
        setUser(data.data);
      } else if (data.data) {
        setUser(data.data);
      }
    } catch (err) {
      console.error('Error fetching user info:', err);
    }
  };

  const fetchIssues = async () => {
    try {
      setError('');
      const res = await fetch('/api/issues', {
        credentials: 'include'
      });

      if (res.status === 401) {
        router.push('/student-login');
        return;
      }

      const data = await res.json();
      
      console.log('Issues fetch response:', { status: res.status, data });

      // Handle different response formats
      let issues: Issue[] = [];
      
      if (data.success && data.data?.issues) {
        issues = data.data.issues;
      } else if (data.data?.issues) {
        issues = data.data.issues;
      } else if (Array.isArray(data.issues)) {
        issues = data.issues;
      } else if (Array.isArray(data)) {
        issues = data;
      }
      
      setIssues(issues);
      
      if (!res.ok && !issues.length) {
        setError(data.error || data.message || 'Failed to load issues');
      }
    } catch (err) {
      console.error('Error fetching issues:', err);
      setError('Failed to load issues. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Role validation - only students can submit issues
    if (user?.role !== 'student') {
      setError('Only students can report issues');
      return;
    }

    // Hostel validation - student must be assigned to hostel
    if (!user?.hostelId) {
      setError('You must be assigned to a hostel to report issues. Please contact administration.');
      return;
    }

    // Validation
    if (!newIssue.title.trim()) {
      setError('Title is required');
      return;
    }

    if (!newIssue.description.trim()) {
      setError('Description is required');
      return;
    }

    if (newIssue.title.trim().length < 3) {
      setError('Title must be at least 3 characters');
      return;
    }

    if (newIssue.description.trim().length < 10) {
      setError('Description must be at least 10 characters');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/issues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newIssue),
        credentials: 'include'
      });

      const data = await res.json();

      console.log('Issue submission response:', { status: res.status, data });

      // Check for errors
      if (!res.ok) {
        const errorMessage = data.error || data.message || 'Failed to submit issue. Please try again.';
        setError(errorMessage);
        return;
      }

      // Check for success
      if (data.success || res.status === 201) {
        setSuccess('Issue reported successfully!');
        setShowForm(false);
        setNewIssue({
          title: '',
          description: '',
          category: 'maintenance',
          priority: 'medium'
        });
        // Refresh issues list
        setTimeout(() => {
          fetchIssues();
          setSuccess('');
        }, 1500);
      } else {
        setError(data.error || data.message || 'Failed to submit issue');
      }
    } catch (err: any) {
      console.error('Error creating issue:', err);
      setError(`Network error: ${err.message || 'Please check your connection and try again'}`);
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading issues...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => router.push('/student/dashboard')}
                className="text-blue-600 hover:text-blue-800 mr-4"
              >
                ← Back to Dashboard
              </button>
              <h1 className="text-xl font-bold text-gray-900">My Issues & Complaints</h1>
            </div>
            <div className="flex items-center gap-3">
              {!user?.hostelId && (
                <div className="text-sm px-3 py-2 bg-yellow-50 border border-yellow-200 rounded text-yellow-700 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Assign hostel to raise tickets
                </div>
              )}
              <button
                onClick={() => user?.hostelId ? setShowForm(true) : null}
                disabled={!user?.hostelId}
                title={!user?.hostelId ? "You must be assigned to a hostel to report issues. Please contact administration." : ""}
                className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${
                  user?.hostelId
                    ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                    : 'bg-gray-300 text-gray-600 cursor-not-allowed opacity-50'
                }`}
              >
                {user?.hostelId ? (
                  <>
                    <Plus className="h-4 w-4" />
                    Report Issue
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    Report Issue
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            {success}
          </div>
        )}

        {user?.role === 'student' && !user?.hostelId && (
          <div className="mb-6 p-4 bg-orange-50 border-l-4 border-orange-500 rounded">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-orange-900">Hostel Assignment Required</h3>
                <p className="text-sm text-orange-800 mt-1">
                  You haven't been assigned to a hostel yet. Please contact your hostel administration to complete your hostel assignment. Once assigned, you'll be able to report issues and complaints.
                </p>
              </div>
            </div>
          </div>
        )}

        {issues.length === 0 ? (
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No issues reported</h3>
            <p className="text-gray-500">Click "Report Issue" to submit your first complaint.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {issues.map((issue) => (
              <div key={issue._id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{issue.title}</h3>
                    <p className="text-sm text-gray-500 capitalize">{issue.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(issue.priority)}`}>
                      {issue.priority}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(issue.status)}`}>
                      {issue.status}
                    </span>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{issue.description}</p>

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Reported: {new Date(issue.createdAt).toLocaleDateString()}</span>
                  {issue.assignedTo && (
                    <span>Assigned to: {issue.assignedTo.name}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Report Issue Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">Report New Issue</h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setError('');
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newIssue.title}
                  onChange={(e) => {
                    setNewIssue({ ...newIssue, title: e.target.value });
                    setError('');
                  }}
                  placeholder="Brief title of the issue"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  minLength={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={newIssue.category}
                  onChange={(e) => setNewIssue({ ...newIssue, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="maintenance">Maintenance</option>
                  <option value="food">Food</option>
                  <option value="security">Security</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  value={newIssue.priority}
                  onChange={(e) => setNewIssue({ ...newIssue, priority: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={newIssue.description}
                  onChange={(e) => {
                    setNewIssue({ ...newIssue, description: e.target.value });
                    setError('');
                  }}
                  placeholder="Describe the issue in detail (minimum 10 characters)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  required
                  minLength={10}
                />
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setError('');
                  }}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : 'Submit Issue'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}