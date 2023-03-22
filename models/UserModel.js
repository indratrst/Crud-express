import mongoose from "mongoose";

const User = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    coco:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
      },
});

export default mongoose.model('Users', User);