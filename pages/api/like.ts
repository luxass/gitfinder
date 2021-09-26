import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../lib/connect";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case "POST":
            const { id } = req.body;
            // Should probably do something if the id in body is not there.
            const { Like } = await connect();
            const like = await Like.findOneAndUpdate(
                { id: id },
                {
                    $inc: { likes: 1 },
                },
                {
                    upsert: true,
                    new: true,
                }
            );

            return res.status(200).json(like);
        default:
            return res.status(405).send("Method Not Allowed");
    }
}
