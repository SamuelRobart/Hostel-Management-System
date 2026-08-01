import mongoose, { Schema } from 'mongoose';
var HostelSchema = new Schema({
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
export default mongoose.models.Hostel || mongoose.model('Hostel', HostelSchema);
