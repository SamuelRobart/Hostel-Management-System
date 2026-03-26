import mongoose, { Schema, Document } from 'mongoose';

export interface IHostel extends Document {
  name: string;
  location: string;
  totalCapacity: number;
  currentOccupancy: number;
  wardenId?: mongoose.Types.ObjectId;
  totalRooms: number;
  totalBeds: number;
  floors: number;
  blocks?: string[];
  address?: string;
  contactNumber?: string;
  facilities: string[];
  createdAt: Date;
}

const HostelSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  totalCapacity: {
    type: Number,
    required: true,
    min: 1,
  },
  currentOccupancy: {
    type: Number,
    default: 0,
    min: 0,
  },
  wardenId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  totalRooms: {
    type: Number,
    default: 0,
  },
  totalBeds: {
    type: Number,
    default: 0,
  },
  floors: {
    type: Number,
    default: 1,
    min: 1,
  },
  blocks: {
    type: [String],
    default: [],
  },
  address: {
    type: String,
    trim: true,
  },
  contactNumber: {
    type: String,
    trim: true,
  },
  facilities: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Hostel || mongoose.model<IHostel>('Hostel', HostelSchema);