import mongoose from 'mongoose';

//let ObjectId = mongoose.Schema.Types.ObjectId;

let topicSchema = new mongoose.Schema({
    slug: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        match: /^[a-z0-9_-]+$/i
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    }
});

module.exports = mongoose.model('Topic', topicSchema);