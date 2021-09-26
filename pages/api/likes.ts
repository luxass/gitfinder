import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../lib/connect";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { Like } = await connect();

    res.status(200).json({
        most_liked: (await Like.find({}).sort("-likes").limit(6)).map(
            (like) => ({
                id: like.id,
                likes: like.likes,
            })
        ),
    });
}
