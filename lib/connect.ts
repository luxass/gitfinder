import axios from "axios";
import mongoose, { Model } from "mongoose";

const { MONGODB_URI } = process.env;

function wait(time: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}

export const connect = async () => {
    const conn = await mongoose
        .connect(MONGODB_URI as string)
        .catch((err) => console.log(err));

    const LikeSchema = new mongoose.Schema({
        id: Number,
        likes: Number,
        username: String,
    });

    LikeSchema.pre("findOneAndUpdate", async function () {
        const apiRes = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/id/${this.getQuery().id}`
        );
        this.set("username", apiRes.data.username);
    });

    const Like = mongoose.models.likes || mongoose.model("likes", LikeSchema);
    return { conn, Like };
};
