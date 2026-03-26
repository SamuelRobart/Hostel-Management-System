'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, Clock, CheckCircle, Users, X } from 'lucide-react';

interface Issue {
  _id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  priority: string;
  reportedBy: string;
  createdAt: string;
  studentId: {
    name: string;
    hostelLocation: string;
  };
}

export default function WardenIssues() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [hostelName, setHostelName] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const res = await fetch('/api/issues', {
        credentials: 'include'
      });
      if (res.status === 401) {
        router.push('/login');
        return;
      }
      const data = await res.json();
      
      // Handle different response formats
      let issuesData: Issue[] = [];
      if (data.success && data.data?.issues) {
        issuesData = data.data.issues;
      } else if (data.data?.issues) {
        issuesData = data.data.issues;
      } else if (Array.isArray(data.issues)) {
        issuesData = data.issues;
      } else if (Array.isArray(data)) {
        issuesData = data;
      }
      
      setIssues(issuesData);
      if (issuesData.length > 0) {
        setHostelName(issuesData[0].studentId?.hostelLocation || 'Hostel');
      }
    } catch (error) {
      console.error('Error fetching issues:', error);
    } finally {
      setLoading(false);
    }
  };

  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  const [resolutionNotes, setResolutionNotes] = useState('');

  const updateIssueStatus = async (issueId: string, newStatus: string, notes?: string) => {
    try {
      const res = await fetch(`/api/issues/${issueId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, resolutionNotes: notes || '' })
      });
      
      if (res.ok) {
        fetchIssues(); // Refresh the list
        setSelectedIssue(null);
        setResolutionNotes('');
      }
    } catch (error) {
      console.error('Error updating issue:', error);
    }
  };

  const handleCloseTicket = (issueId: string) => {
    if (resolutionNotes.trim()) {
      updateIssueStatus(issueId, 'closed', resolutionNotes);
    } else {
      alert('Please add resolution notes before closing the ticket.');
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'in-progress': return <AlertCircle className="h-4 w-4" />;
      case 'resolved': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => router.push('/warden/dashboard')}
                className="text-blue-600 hover:text-blue-800 mr-4"
              >
                ← Back to Dashboard
              </button>
              <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <AlertCircle className="h-6 w-6" />
                Issues Management - {hostelName}
              </h1>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Users className="h-4 w-4 mr-1" />
              {issues.length} Total Issues
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {issues.filter(i => i.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">
                  {issues.filter(i => i.status === 'in-progress').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Resolved</p>
                <p className="text-2xl font-bold text-gray-900">
                  {issues.filter(i => i.status === 'resolved').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-red-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Urgent</p>
                <p className="text-2xl font-bold text-gray-900">
                  {issues.filter(i => i.priority === 'urgent').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {issues.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No issues reported</h3>
            <p className="text-gray-500">All clear! No issues from your hostel students.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {issues.map((issue) => (
              <div key={issue._id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(issue.status)}
                      <h3 className="text-lg font-semibold text-gray-900">{issue.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Reported by: <span className="font-medium">{issue.reportedBy}</span>
                      <span className="mx-2">•</span>
                      Category: <span className="capitalize">{issue.category}</span>
                    </p>
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
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Reported: {new Date(issue.createdAt).toLocaleDateString()}
                  </span>
                  
                  {issue.status !== 'closed' && (
                    <div className="flex gap-2">
                      {issue.status === 'pending' && (
                        <button
                          onClick={() => updateIssueStatus(issue._id, 'in-progress')}
                          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          Start Working
                        </button>
                      )}
                      {issue.status === 'in-progress' && (
                        <>
                          <button
                            onClick={() => {
                              setSelectedIssue(issue._id);
                            }}
                            className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                          >
                            Resolve & Close
                          </button>
                        </>
                      )}
                      {issue.status === 'resolved' && (
                        <button
                          onClick={() => {
                            setSelectedIssue(issue._id);
                          }}
                          className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700"
                        >
                          Close Ticket
                        </button>
                      )}
                    </div>
                  )}
                  {issue.status === 'closed' && (
                    <span className="text-sm text-gray-500">Ticket Closed</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Resolution Modal */}
        {selectedIssue && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Close Ticket</h3>
                <button
                  onClick={() => {
                    setSelectedIssue(null);
                    setResolutionNotes('');
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resolution Notes (Required)
                </label>
                <textarea
                  value={resolutionNotes}
                  onChange={(e) => setResolutionNotes(e.target.value)}
                  placeholder="Describe how the issue was resolved..."
                  className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                  required
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => {
                    setSelectedIssue(null);
                    setResolutionNotes('');
                  }}
                  className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleCloseTicket(selectedIssue)}
                  disabled={!resolutionNotes.trim()}
                  className="px-4 py-2 text-sm bg-gray-600 text-white rounded hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Close Ticket
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}