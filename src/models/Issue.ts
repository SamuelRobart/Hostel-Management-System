import mongoose, { Schema, Document } from 'mongoose';

export interface IIssue extends Document {
  ticketNumber: string;
  studentId: mongoose.Types.ObjectId;
  hostelId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  category: 'maintenance' | 'food' | 'security' | 'other';
  status: 'pending' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  reportedBy: string;
  assignedTo?: mongoose.Types.ObjectId;
  resolutionNotes?: string;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
  closedAt?: Date;
}

const IssueSchema: Schema = new Schema({
  ticketNumber: {
    type: String,
    unique: true,
    required: true,
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  hostelId: {
    type: Schema.Types.ObjectId,
    ref: 'Hostel',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['maintenance', 'food', 'security', 'other'],
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'in-progress', 'resolved', 'closed'],
    default: 'pending',
  },
  priority: {
    type: String,
    required: true,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium',
  },
  reportedBy: {
    type: String,
    required: true,
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  resolutionNotes: {
    type: String,
  },
  resolvedAt: {
    type: Date,
  },
  closedAt: {
    type: Date,
  },
}, {
  timestamps: true,
});

// Generate ticket number before saving
IssueSchema.pre('save', async function(next) {
  if (!this.ticketNumber) {
    try {
      const Issue = mongoose.model('Issue');
      const count = await Issue.countDocuments();
      this.ticketNumber = `TKT-${Date.now().toString().slice(-8)}-${(count + 1).toString().padStart(4, '0')}`;
    } catch (error) {
      // Fallback if model not available yet
      this.ticketNumber = `TKT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
  }
  next();
});

export default mongoose.models.Issue || mongoose.model<IIssue>('Issue', IssueSchema);