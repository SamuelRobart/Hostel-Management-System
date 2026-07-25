import { NextRequest } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Issue from '@/models/Issue';
import { withProtection, requireRole } from '@/lib/protected-routes';
import { successResponse, badRequestResponse, unauthorizedResponse, notFoundResponse, serverErrorResponse } from '@/lib/api-response';
import { AuthPayload } from '@/lib/auth';

export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
  return withProtection(
    async (request: NextRequest, user: AuthPayload) => {
      try {
        // Only wardens and admins can update issues
        if (!['warden', 'admin'].includes(user.role)) {
          return unauthorizedResponse('Only wardens and admins can update issues');
        }

        const body = await request.json();
        const { status, resolutionNotes } = body;

        // Validate required fields
        if (!status) {
          return badRequestResponse('Status is required');
        }

        const validStatuses = ['pending', 'in-progress', 'resolved', 'closed'];
        if (!validStatuses.includes(status)) {
          return badRequestResponse(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
        }

        await connectToDatabase();

        const issue = await Issue.findById(params.id).lean() as any;
        if (!issue) {
          return notFoundResponse('Issue');
        }

        const updateData: any = {
          status,
        };

        if (status === 'in-progress' && !issue.assignedTo) {
          updateData.assignedTo = user.id;
        }

        if (status === 'resolved') {
          updateData.resolvedAt = new Date();
          updateData.assignedTo = user.id;
          if (resolutionNotes) {
            updateData.resolutionNotes = resolutionNotes;
          }
        }

        if (status === 'closed') {
          updateData.closedAt = new Date();
          if (!issue.resolvedAt) {
            updateData.resolvedAt = new Date();
          }
          if (resolutionNotes) {
            updateData.resolutionNotes = resolutionNotes;
          }
        }

        const updatedIssue = (await Issue.findByIdAndUpdate(params.id, updateData, {
          new: true,
        }).lean()) as any;

        return successResponse(
          {
            issue: {
              id: updatedIssue?._id,
              status: updatedIssue?.status,
              assignedTo: updatedIssue?.assignedTo,
              resolvedAt: updatedIssue?.resolvedAt,
            },
          },
          'Issue status updated successfully'
        );
      } catch (error: any) {
        console.error('Issue update error:', error);
        return serverErrorResponse('Failed to update issue');
      }
    }
  )(req);
};