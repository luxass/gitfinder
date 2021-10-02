import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../lib/connect";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case "POST": {
            const { id } = req.body;
            // Should probably do something if the id in body is not there.
            const { Like } = await connect();
            // We fetch the users username from id here
            /*         const apiRes = await axios.get(
                `https://api.github.com/user/${id}`
            ); */

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
        }
        case "GET": {
            const { id } = req.query;
            const { Like } = await connect();
            const likes = (
                await Like.findOneAndUpdate(
                    { id: id },
                    {},
                    {
                        upsert: true,
                        new: true,
                    }
                )
            ).likes;

            return res.status(200).json({
                id: id,
                likes,
            });
        }
        default:
            return res.status(405).send("Method Not Allowed");
    }
}
