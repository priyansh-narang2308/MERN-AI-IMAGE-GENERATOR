import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    prompt: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
});

const PostModel = mongoose.model("PostModel", PostSchema);

export default PostModel;