import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type UserData = {
    username: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<UserData | { message: string }>
) {
    try {
        const id = req.query.id;
        let userId: string = "";
        userId = id as string;
        if (Array.isArray(id)) userId = userId[0];

        const userResponse = await axios.get(
            `https://api.github.com/user/${userId}`,
            {
                headers: {
                    Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
                },
            }
        );

        res.status(200).json({
            username: userResponse.data.login,
        });
    } catch (err) {
        return res.status(404).json({
            message: "User with that id does not exist on github.",
        });
    }
}
