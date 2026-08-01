import mongoose, { Schema } from 'mongoose';
var MenuSchema = new Schema({
    hostelId: {
        type: Schema.Types.ObjectId,
        ref: 'Hostel',
        required: true,
    },
    day: {
        type: String,
        required: true,
        enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    },
    breakfast: {
        type: String,
        required: true,
    },
    lunch: {
        type: String,
        required: true,
    },
    dinner: {
        type: String,
        required: true,
    },
    week: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
// Compound index to ensure unique menu per hostel per day per week
MenuSchema.index({ hostelId: 1, day: 1, week: 1 }, { unique: true });
export default mongoose.models.Menu || mongoose.model('Menu', MenuSchema);
