import mongoose from 'mongoose';

let ObjectId = mongoose.Schema.Types.ObjectId;

let newsSchema = new mongoose.Schema({
    slug: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        match: /^[a-z0-9_-]+$/i
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    topics: [{
        type: ObjectId,
        ref: 'Topic'
    }],
    status: {
        type: String,
        default: 'draft',
        trim: true
    },
    created: {
        type: Date,
        default: Date.now,
        index: true
    }
});

module.exports = mongoose.model('News', newsSchema);