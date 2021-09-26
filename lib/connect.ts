import axios from "axios";
import mongoose, { Model } from "mongoose";

const { MONGODB_URI } = process.env;

export const connect = async () => {
    const conn = await mongoose
        .connect(MONGODB_URI as string)
        .catch((err) => console.log(err));

    const LikeSchema = new mongoose.Schema({
        id: Number,
        likes: Number,
        username: String,
    });

    LikeSchema.pre("save", async function (next) {
        const apiRes = await axios.get(
            `https://api.github.com/user/${this.id}`
        );
        this.username = "apiRes.data.login";
        next();
    });
    const Like = mongoose.models.likes || mongoose.model("likes", LikeSchema);
    return { conn, Like };
};
