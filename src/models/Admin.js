import mongoose, { Schema } from 'mongoose';
var AdminSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
export default mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
