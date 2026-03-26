import mongoose, { Schema, Document } from 'mongoose';

export interface IRoomAssignmentLog extends Document {
  studentId: mongoose.Types.ObjectId;
  studentName: string;
  studentPhone: string;
  hostelId: mongoose.Types.ObjectId;
  hostelName?: string;
  roomId: mongoose.Types.ObjectId;
  roomNumber: string;
  bedNumber: number;
  floor: number;
  wardenId: mongoose.Types.ObjectId;
  wardenName: string;
  action: 'assign' | 'reassign' | 'unassign';
  previousRoomId?: mongoose.Types.ObjectId;
  previousRoomNumber?: string;
  previousBedNumber?: number;
  assignedAt: Date;
  unassignedAt?: Date;
  reason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const RoomAssignmentLogSchema: Schema = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    studentName: {
      type: String,
      required: true,
      trim: true,
    },
    studentPhone: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    hostelId: {
      type: Schema.Types.ObjectId,
      ref: 'Hostel',
      required: true,
      index: true,
    },
    hostelName: {
      type: String,
      trim: true,
    },
    roomId: {
      type: Schema.Types.ObjectId,
      ref: 'Room',
      required: true,
      index: true,
    },
    roomNumber: {
      type: String,
      required: true,
      trim: true,
    },
    bedNumber: {
      type: Number,
      required: true,
    },
    floor: {
      type: Number,
      required: false,
    },
    wardenId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    wardenName: {
      type: String,
      required: true,
      trim: true,
    },
    action: {
      type: String,
      enum: ['assign', 'reassign', 'unassign'],
      default: 'assign',
      index: true,
    },
    previousRoomId: {
      type: Schema.Types.ObjectId,
      ref: 'Room',
    },
    previousRoomNumber: {
      type: String,
      trim: true,
    },
    previousBedNumber: {
      type: Number,
    },
    assignedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    unassignedAt: {
      type: Date,
    },
    reason: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for student-hostel queries
RoomAssignmentLogSchema.index({ studentId: 1, hostelId: 1 });
RoomAssignmentLogSchema.index({ assignedAt: -1 });

export default mongoose.models.RoomAssignmentLog || mongoose.model<IRoomAssignmentLog>('RoomAssignmentLog', RoomAssignmentLogSchema);
