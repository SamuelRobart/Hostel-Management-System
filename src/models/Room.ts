import mongoose, { Schema, Document } from 'mongoose';

export interface IBed extends Document {
  bedNumber: number;
  isOccupied: boolean;
  studentId?: mongoose.Types.ObjectId;
  occupiedAt?: Date;
}

export interface IRoom extends Document {
  hostelId: mongoose.Types.ObjectId;
  roomNumber: string;
  floor: number;
  block?: string;
  capacity: number;
  currentOccupancy: number;
  beds: IBed[];
  roomType: 'single' | 'double' | 'triple' | 'quad';
  amenities: string[];
  createdAt: Date;
  updatedAt: Date;
}

const BedSchema: Schema = new Schema({
  bedNumber: {
    type: Number,
    required: true,
  },
  isOccupied: {
    type: Boolean,
    default: false,
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  occupiedAt: {
    type: Date,
  },
}, { _id: false });

const RoomSchema: Schema = new Schema({
  hostelId: {
    type: Schema.Types.ObjectId,
    ref: 'Hostel',
    required: true,
  },
  roomNumber: {
    type: String,
    required: true,
    trim: true,
  },
  floor: {
    type: Number,
    required: true,
    min: 0,
  },
  block: {
    type: String,
    trim: true,
  },
  capacity: {
    type: Number,
    required: true,
    min: 1,
    max: 4,
  },
  currentOccupancy: {
    type: Number,
    default: 0,
    min: 0,
  },
  beds: {
    type: [BedSchema],
    default: [],
  },
  roomType: {
    type: String,
    enum: ['single', 'double', 'triple', 'quad'],
    required: true,
  },
  amenities: {
    type: [String],
    default: [],
  },
}, {
  timestamps: true,
});

// Compound index to ensure unique room numbers per hostel
RoomSchema.index({ hostelId: 1, roomNumber: 1 }, { unique: true });

export default mongoose.models.Room || mongoose.model<IRoom>('Room', RoomSchema);
