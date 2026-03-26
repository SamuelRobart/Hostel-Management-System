'use client';
import { useState } from 'react';

export default function TestStudentPage() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);

  const addTestStudent = async () => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: "Test Student",
          phone: "1111111111",
          dateOfBirth: "2003-01-01",
          fatherName: "Test Father",
          motherName: "Test Mother",
          email: "test@gmail.com",
          native: "Coimbatore",
          address: "Test Address",
          course: "B.A English",
          college: "Test College",
          income: "₹50000",
          percentage12th: "80%",
          bankDetails: "Test Bank",
          caste: "BC"
        })
      });

      const result = await response.json();
      console.log('API Response:', result);
      
      if (result.success) {
        setMessage(`✅ Student added successfully!\n\nLogin with:\nPhone: 1111111111\nDOB: 2003-01-01`);
      } else {
        setMessage(`❌ Error: ${result.message}`);
      }
    } catch (error) {
      console.log('Fetch Error:', error);
      setMessage('❌ Network error');
    } finally {
      setLoading(false);
    }
  };

  const checkStudents = async () => {
    try {
      const response = await fetch('/api/students/list');
      const result = await response.json();
      console.log('Students in DB:', result);
      setStudents(result.students || []);
      setMessage(`Database has ${result.count || 0} students`);
    } catch (error) {
      setMessage('Error checking database');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8">
        <h2 className="text-2xl font-bold text-center">Test Database</h2>
        
        <div className="space-y-4">
          <button 
            onClick={addTestStudent}
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Test Student'}
          </button>
          
          <button 
            onClick={checkStudents}
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
          >
            Check Database
          </button>
        </div>

        {message && (
          <div className="p-4 bg-gray-100 rounded-md text-sm whitespace-pre-line">
            {message}
          </div>
        )}
        
        {students.length > 0 && (
          <div className="p-4 bg-blue-50 rounded-md">
            <h3 className="font-bold mb-2">Students in Database:</h3>
            {students.map((student: any, index) => (
              <div key={index} className="text-sm mb-2">
                <strong>{student.name}</strong> - {student.phone}
              </div>
            ))}
          </div>
        )}

        <div className="text-center space-y-2">
          <a href="/student" className="block text-blue-600 hover:underline">
            Go to Student Login
          </a>
        </div>
      </div>
    </div>
  );
}