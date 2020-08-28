'use strict';
const { Schema, model, Types } = require('mongoose');
const PostSchema = new Schema({
    pk: {
        type: Number,
        unique: true,
    },
    author: {
        type: String,        
    },
    like_count: {
        type: Number,
        default: 0,
    },
    description: {
        type: String,        
    },   
    url: {
        type: String,        
    },   
    count: {
        type: Number,
        default: 0,
    },
    type: {
        type: String, 
    },
    comments: {
        
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})
module.exports = model("Post", PostSchema);