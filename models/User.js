'use strict';
const { Schema, model, Types } = require('mongoose');
const UserSchema = new Schema({   
    username: {
        type: String,
        required: true,        
        unique: true,
    },    
    avatar: {
        type: String        
    },
    fullName: {
        type: String
    }
    bio: {
        type: String        
    },
    website: {
        type: String        
    },
    followers: [{ type: Types.ObjectId, ref: "User" }],
    followersCount: {
        type: Number,
        default: 0,
    },
    followingCount: {
        type: Number,
        default: 0,
    },
    following: [{ type: Types.ObjectId, ref: "User" }],
    posts: [{ type: Types.ObjectId, ref: "Post" }],
    postCount: {
        type: Number,
        default: 0,
    },
    savedPosts: [{ type: Types.ObjectId, ref: "Post" }],
    likedPosts: [{ type: Types.ObjectId, ref: "Post" }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

export default model("User", UserSchema);