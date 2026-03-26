import { NextRequest } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Issue from '@/models/Issue';
import User from '@/models/User';
import { withProtection } from '@/lib/protected-routes';
import { successResponse, serverErrorResponse, unauthorizedResponse, notFoundResponse, badRequestResponse } from '@/lib/api-response';
import { AuthPayload } from '@/lib/auth';

export const GET = async (req: NextRequest) => {
  return withProtection(
    async (request: NextRequest, user: AuthPayload) => {
      try {
        await connectToDatabase();

        let issues: any = [];

        if (user.role === 'student') {
          // Students see only their issues
          issues = await Issue.find({ studentId: user.id })
            .populate('assignedTo', 'name')
            .sort({ createdAt: -1 })
            .lean();
        } else if (user.role === 'warden') {
          // Wardens see issues from their hostel
          const warden = await User.findById(user.id).lean() as any;
          if (!warden) {
            return notFoundResponse('Warden');
          }

          issues = await Issue.find()
            .populate('studentId', 'name hostelLocation')
            .populate('assignedTo', 'name')
            .sort({ createdAt: -1 })
            .lean();

          // Filter by hostel location
          issues = issues.filter(
            (issue: any) => issue.studentId?.hostelLocation === warden.hostelLocation
          );
        } else if (user.role === 'admin') {
          // Admins see all issues
          issues = await Issue.find()
            .populate('studentId', 'name hostelLocation')
            .populate('assignedTo', 'name')
            .sort({ createdAt: -1 })
            .lean();
        }

        // Transform for response
        const transformedIssues = issues.map((issue: any) => ({
          _id: issue._id,
          title: issue.title,
          description: issue.description,
          category: issue.category,
          status: issue.status,
          priority: issue.priority,
          createdAt: issue.createdAt,
          assignedTo: issue.assignedTo,
          studentId: issue.studentId,
        }));

        return successResponse(
          { issues: transformedIssues },
          'Issues retrieved successfully'
        );
      } catch (error: any) {
        console.error('Issues fetch error:', error);
        return serverErrorResponse('Failed to fetch issues');
      }
    }
  )(req);
};

export const POST = async (req: NextRequest) => {
  return withProtection(
    async (request: NextRequest, user: AuthPayload) => {
      try {
        // Only students and wardens can report issues
        if (!['student', 'warden'].includes(user.role)) {
          return unauthorizedResponse('Only students and wardens can report issues');
        }

        const body = await request.json();
        const { title, description, category, priority } = body;

        // Validate required fields
        if (!title || !description) {
          return badRequestResponse('Title and description are required');
        }

        if (typeof title !== 'string' || typeof description !== 'string') {
          return badRequestResponse('Title and description must be text');
        }

        await connectToDatabase();

        const student = await User.findById(user.id).lean() as any;
        if (!student) {
          console.error('Student not found with ID:', user.id);
          return notFoundResponse('User');
        }

        if (!student.hostelId) {
          return badRequestResponse(
            'You are not assigned to a hostel. Please contact administration to assign you a hostel.'
          );
        }

        try {
          // Generate ticket number
          const count = await Issue.countDocuments();
          const ticketNumber = `TKT-${Date.now().toString().slice(-8)}-${(count + 1).toString().padStart(4, '0')}`;

          const issue = new Issue({
            ticketNumber: ticketNumber,
            studentId: user.id,
            hostelId: student.hostelId,
            title: title.trim(),
            description: description.trim(),
            category: category || 'maintenance',
            priority: priority || 'medium',
            reportedBy: student.name,
            status: 'pending',
          });

          await issue.save();

          return successResponse(
            {
              issue: {
                id: issue._id.toString(),
                ticketNumber: issue.ticketNumber,
                title: issue.title,
                status: issue.status,
              },
            },
            'Issue reported successfully',
            201
          );
        } catch (dbError: any) {
          console.error('Database error saving issue:', dbError);
          return serverErrorResponse(`Failed to save issue: ${dbError.message}`);
        }
      } catch (error: any) {
        console.error('Issue creation error:', error);
        return serverErrorResponse(`Failed to create issue: ${error.message}`);
      }
    }
  )(req);
};