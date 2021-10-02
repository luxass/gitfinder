import axios from "axios";
import { useCallback } from "react";
import ThumbsUp from "../components/ThumbsUp";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Layout from "../components/Layout";
import Avatar from "../components/Avatar";
import ReactTooltip from "react-tooltip";
import Mail from "../components/Mail";
import Location from "../components/Location";
import Twitter from "../components/Twitter";
import Building from "../components/Building";

export default function User({
    user,
    likes,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    let company: string[] = user.company.includes("@")
        ? user.company.split(" ")
        : [user.company] || ["Not Available"];

    const like = useCallback(async () => {
        const res = await axios.post(`/api/like`, {
            id: user.id,
        });
        const { data } = res;
        likes = data;
    }, [likes]);
    return (
        <Layout>
            <div className="max-w-3xl w-full md:w-2/3">
                <div className="flex justify-between">
                    <h1 className="font-roboto text-3xl mb-5 ml-2 text-left text-white">
                        gitfinder
                    </h1>
                    <button
                        className="py-1 px-3 ml-2 mb-5 rounded h-2/4 text-green-500"
                        onClick={like}
                    >
                        <ThumbsUp width={32} height={32} />
                    </button>
                </div>
                <div className="flex bg-light-blue p-12 flex-col rounded-none md:rounded">
                    <div className="mb-5 flex">
                        <Avatar url={user.avatar_url} />
                        <div className="ml-7 flex-1 flex flex-col">
                            <div className="font-roboto mb-2 flex justify-start lg:justify-between text-white">
                                <h1>{user.name}</h1>
                                <p className="hidden lg:block">
                                    Joined{" "}
                                    {new Intl.DateTimeFormat("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    }).format(new Date(user.created_at))}
                                </p>
                            </div>
                            <div className="flex-1">
                                <a
                                    href={`https://github.com/${user.login}?tab=repositories`}
                                    className="font-roboto text-white"
                                >
                                    {`@${user.login}`}
                                </a>
                            </div>
                            <p className="lg:hidden font-roboto text-white">
                                Joined{" "}
                                {new Intl.DateTimeFormat("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                }).format(new Date(user.created_at))}
                            </p>
                            <div className="font-roboto text-white hidden lg:block">
                                {user.bio || "This profile has no bio"}
                            </div>
                        </div>
                    </div>
                    <div className="mb-5 font-roboto text-white lg:hidden">
                        {user.bio || "This profile has no bio"}
                    </div>
                    <div className="mb-5 h-14 rounded bg-darker-blue flex justify-around items-center font-roboto text-white">
                        <div>
                            <p>Repos</p>

                            <p>{user.public_repos}</p>
                        </div>
                        <div>
                            <p>Followers</p>

                            <p>{user.followers}</p>
                        </div>

                        <div>
                            <p>Follwing</p>

                            <p>{user.following}</p>
                        </div>

                        <div>
                            <p>Likes</p>

                            <p>{likes.likes}</p>
                        </div>
                    </div>
                    <div className="block lg:flex flex-row flex-wrap justify-evenly font-roboto text-white">
                        <div>
                            <Location />
                            <p className="inline-block ml-3">
                                {user.location || "Not Available"}
                            </p>
                        </div>
                        <div>
                            <Twitter />
                            <p className="inline-block ml-3">
                                {user.twitter_username || "Not Available"}
                            </p>
                        </div>
                        <div>
                            <Mail />
                            <p className="inline-block ml-3">
                                {user.email || "Not Available"}
                            </p>
                        </div>
                        <div>
                            <Building />
                            <p
                                className="inline-block ml-3"
                                data-tip="React-tooltip"
                            >
                                {company[0] !== "Not Available" &&
                                company.length > 1
                                    ? `${company[0]}...`
                                    : company}
                                {company[0] !== "Not Available" &&
                                    company.length > 1 && (
                                        <ReactTooltip
                                            place="right"
                                            type="dark"
                                            effect="solid"
                                        >
                                            <h1 className="text-lg pb-1">
                                                Companies
                                            </h1>
                                            <ul>
                                                {company &&
                                                    Array.isArray(company) &&
                                                    company.map(
                                                        (
                                                            company: string,
                                                            index
                                                        ) => (
                                                            <li key={index}>
                                                                {company}
                                                            </li>
                                                        )
                                                    )}
                                            </ul>
                                        </ReactTooltip>
                                    )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    try {
        const { user } = ctx.query;
        const res = await axios.get<{
            login: string;
            id: number;
            avatar_url: string;
            name: string;
            location: string;
            email: string;
            bio: string;
            twitter_username: string;
            public_repos: number;
            followers: number;
            following: number;
            created_at: string;
            company: string | null;
        }>(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${user}`);
        const likes = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/like?id=${res.data.id}`
        );
        return {
            props: {
                user: res.data,
                likes: likes.data,
            },
        };
    } catch (err) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
}
