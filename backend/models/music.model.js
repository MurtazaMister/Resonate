const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const musicSchema = new Schema({
    thumbnail: {
        type: Schema.Types.ObjectId,
        ref: 'images.files',
    },
    title: {
        type: String,
        required: true,
    },
    artists: {
        type: String,
    },
    isPublic: {
        type: Boolean,
        required: true,
    },
    isAnonymous: {
        type: Boolean,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: false,
    },
    song: {
        type: Schema.Types.ObjectId,
        ref: 'songs.files'
    },
    duration: {
        type: String,
    }
},{
    timestamps: true,
});

const Music = mongoose.model('Music',musicSchema);

module.exports = Music;