import mongoose, { Schema } from 'mongoose';
var BedSchema = new Schema({
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
var RoomSchema = new Schema({
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
export default mongoose.models.Room || mongoose.model('Room', RoomSchema);
