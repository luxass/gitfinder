import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type UserData = {
    login: string;
    id: number;
    avatar_url: string;
    name: string;
    blog: string;
    location: string;
    email: string;
    bio: string;
    company: string;
    twitter_username: string;
    public_repos: number;
    followers: number;
    following: number;
    created_at: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<UserData | { message: string }>
) {
    try {
        const user = req.query.user;
        let username: string = "";
        username = user as string;
        if (Array.isArray(user)) username = user[0];

        const userResponse = await axios.get(
            `https://api.github.com/users/${username}`,
            {
                headers: {
                    Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
                },
            }
        );

        const {
            login,
            id,
            avatar_url,
            blog,
            name,
            location,
            email,
            bio,
            twitter_username,
            public_repos,
            followers,
            following,
            created_at,
            company,
        } = userResponse.data;

        res.status(200).json({
            login,
            id,
            avatar_url,
            name,
            blog,
            location,
            email,
            bio,
            twitter_username,
            public_repos,
            followers,
            following,
            created_at,
            company,
        });
    } catch (err) {
        return res.status(404).json({
            message: "User does not exist on github.",
        });
    }
}
