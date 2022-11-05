const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const musicSchema = new Schema({
    thumbnail: {
        type: Schema.Types.ObjectId,
        ref: 'songs.files',
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
        ref: 'User',
        required: false,
    },
    song: {
        type: Schema.Types.ObjectId,
        ref: 'images.files'
    },
},{
    timestamps: true,
});

const Music = mongoose.model('Music',musicSchema);

module.exports = Music;