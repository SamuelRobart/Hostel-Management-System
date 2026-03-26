'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function AdminSetupPage() {
  const [action, setAction] = useState('init');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [admins, setAdmins] = useState<any[]>([]);

  const handleInitialize = async () => {
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const res = await fetch('/api/admin/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'init',
          adminPassword
        })
      });

      const data = await res.json();

      if (data.success) {
        setMessage(`✓ ${data.message}. Created ${data.count} admin accounts`);
        await handleListAdmins();
        setAdminPassword('');
      } else {
        setError(data.message || 'Initialization failed');
      }
    } catch (err) {
      setError('Failed to initialize');
    } finally {
      setLoading(false);
    }
  };

  const handleAddAdmin = async () => {
    if (!username || !password) {
      setError('Username and password required');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const res = await fetch('/api/admin/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add',
          username,
          password
        })
      });

      const data = await res.json();

      if (data.success) {
        setMessage(`✓ Admin added: ${data.admin.username}`);
        setUsername('');
        setPassword('');
        await handleListAdmins();
      } else {
        setError(data.message || 'Failed to add admin');
      }
    } catch (err) {
      setError('Failed to add admin');
    } finally {
      setLoading(false);
    }
  };

  const handleListAdmins = async () => {
    try {
      const res = await fetch('/api/admin/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'list' })
      });

      const data = await res.json();
      if (data.success) {
        setAdmins(data.admins);
      }
    } catch (err) {
      console.error('Failed to list admins');
    }
  };

  const handleDeleteAdmin = async (adminUsername: string) => {
    if (!confirm(`Delete admin: ${adminUsername}?`)) return;

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const res = await fetch('/api/admin/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete',
          username: adminUsername
        })
      });

      const data = await res.json();

      if (data.success) {
        setMessage('✓ Admin deleted');
        await handleListAdmins();
      } else {
        setError(data.message || 'Failed to delete');
      }
    } catch (err) {
      setError('Failed to delete admin');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Management</h1>
          <p className="text-gray-600 mt-2">Initialize or manage admin accounts</p>
          <p className="text-sm text-gray-500 mt-1">No seed file needed - manage directly from database</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {message && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700">{message}</p>
          </div>
        )}

        {/* Initialize Section */}
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Initialize Default Admins</h2>
          <p className="text-sm text-gray-600 mb-4">
            Create default admin accounts: admin, superadmin, hostel_admin
          </p>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Initialization Password
            </label>
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="Enter initialization password "
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {/* <p className="text-xs text-gray-500 mt-1">Default password: sam2025</p> */}
          </div>
          <button
            onClick={handleInitialize}
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 font-medium"
          >
            {loading ? 'Initializing...' : 'Initialize Default Admins'}
          </button>
        </div>

        {/* Add Single Admin */}
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Admin</h2>
          <div className="space-y-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <button
            onClick={handleAddAdmin}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
          >
            {loading ? 'Adding...' : 'Add Admin'}
          </button>
        </div>

        {/* List Admins */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Existing Admins</h2>
            <button
              onClick={handleListAdmins}
              className="text-purple-600 hover:text-purple-700 text-sm font-medium"
            >
              Refresh
            </button>
          </div>

          {admins.length === 0 ? (
            <p className="text-gray-600 text-center py-4">No admins found</p>
          ) : (
            <div className="space-y-2">
              {admins.map((admin) => (
                <div key={admin._id} className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200">
                  <div>
                    <p className="font-medium text-gray-900">{admin.username}</p>
                    <p className="text-xs text-gray-500">
                      Created: {new Date(admin.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteAdmin(admin.username)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/admin-login"
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            Go to Admin Login
          </Link>
        </div>
      </div>
    </div>
  );
}
