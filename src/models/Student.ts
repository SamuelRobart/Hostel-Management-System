import mongoose, { Schema, Document } from 'mongoose';

export interface IStudent extends Document {
  name: string;
  phone: string;
  dateOfBirth: string;
  fatherName: string;
  motherName: string;
  email: string;
  native: string;
  address: string;
  course: string;
  college: string;
  income: string;
  percentage12th: string;
  bankDetails: string;
  caste: string;
  hostelLocation: string;
}

const StudentSchema: Schema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  dateOfBirth: { type: String, required: true },
  fatherName: { type: String },
  motherName: { type: String },
  email: { type: String },
  native: { type: String },
  address: { type: String },
  course: { type: String },
  college: { type: String },
  income: { type: String },
  percentage12th: { type: String },
  bankDetails: { type: String },
  caste: { type: String },
  hostelLocation: { type: String }
}, {
  timestamps: true
});

export default mongoose.models.Student || mongoose.model<IStudent>('Student', StudentSchema);