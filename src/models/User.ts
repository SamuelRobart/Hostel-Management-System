import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  phone: string;
  alternatePhone?: string;
  role: 'student' | 'warden' | 'admin' | 'security';
  name: string;
  username?: string;
  dateOfBirth?: Date;
  password?: string;
  isActive: boolean;
  lastLogin?: Date;
  hostelId?: mongoose.Types.ObjectId;
  // Student specific fields
  fatherName?: string;
  motherName?: string;
  email?: string;
  native?: string;
  address?: string;
  course?: string;
  college?: string;
  appliedColleges?: string[]; // Multiple colleges applied to in Coimbatore
  income?: string;
  percentage12th?: string;
  bankDetails?: string;
  caste?: string;
  aadhaarNumber?: string;
  communityCertificateNumber?: string;
  photoUrl?: string;
  documents?: Array<{
    type: 'aadhaar' | 'birth_certificate' | '10th_marksheet' | '12th_marksheet' | 'bank_passbook' | 'community_certificate';
    documentUrl?: string;
    uploadedAt?: Date;
  }>;
  hostelLocation?: string;
  roomId?: mongoose.Types.ObjectId;
  roomNumber?: string;
  bedNumber?: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['student', 'warden', 'admin', 'security'],
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      trim: true,
      sparse: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    dateOfBirth: {
      type: Date,
      required: function (this: IUser) {
        return this.role === 'student';
      },
    },
    password: {
      type: String,
      required: function (this: IUser) {
        return this.role === 'warden' || this.role === 'admin' || this.role === 'security';
      },
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
    hostelId: {
      type: Schema.Types.ObjectId,
      ref: 'Hostel',
      required: false,
    },
    // Student specific fields
    fatherName: { type: String, trim: true },
    motherName: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    native: { type: String, trim: true },
    address: { type: String, trim: true },
    course: { type: String, trim: true },
    college: { type: String, trim: true },
    appliedColleges: { 
      type: [String], 
      trim: true,
      default: []
    },
    income: { type: String, trim: true },
    percentage12th: { type: String, trim: true },
    bankDetails: { type: String, trim: true },
    caste: { type: String, trim: true },
    aadhaarNumber: { type: String, trim: true, unique: true, sparse: true },
    communityCertificateNumber: { type: String, trim: true },
    photoUrl: { type: String, trim: true },
    documents: [{
      type: {
        type: String,
        enum: ['aadhaar', 'birth_certificate', '10th_marksheet', '12th_marksheet', 'bank_passbook', 'community_certificate']
      },
      documentUrl: { type: String, trim: true },
      uploadedAt: { type: Date, default: Date.now }
    }],
    alternatePhone: { type: String, trim: true, unique: true, sparse: true },
    hostelLocation: { type: String, trim: true },
    roomId: {
      type: Schema.Types.ObjectId,
      ref: 'Room',
    },
    roomNumber: { type: String, trim: true },
    bedNumber: { type: Number },
  },
  {
    timestamps: true,
  }
);

// Index for role-based queries
UserSchema.index({ role: 1, isActive: 1 });
UserSchema.index({ phone: 1, role: 1 });

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);