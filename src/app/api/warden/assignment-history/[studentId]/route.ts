import { NextRequest } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import RoomAssignmentLog from '@/models/RoomAssignmentLog';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@/lib/config';
import { successResponse, forbiddenResponse, serverErrorResponse } from '@/lib/api-response';

export async function GET(
  request: NextRequest,
  { params }: { params: { studentId: string } }
) {
  try {
    // Extract and verify token
    const token = request.cookies.get('auth_token')?.value;
    
    if (!token) {
      return forbiddenResponse('No authentication token');
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return forbiddenResponse('Invalid or expired token');
    }
    
    if (decoded.role !== 'warden' && decoded.role !== 'admin') {
      return forbiddenResponse('Only wardens and admins can view assignment history');
    }

    await connectToDatabase();

    const { studentId } = params;

    // Fetch assignment history for the student, sorted by newest first
    const logs = await RoomAssignmentLog.find({ studentId })
      .sort({ assignedAt: -1 })
      .lean();

    return successResponse(logs, 'Assignment history retrieved successfully');

  } catch (error: any) {
    console.error('Error fetching assignment history:', error);
    return serverErrorResponse('Failed to fetch assignment history');
  }
}
