import axios from "axios";
import Layout from "../components/Layout";
import Search from "../components/Search";
import Liked from "../components/Liked";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

export default function Home({
    most_liked,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Layout>
            <div className="w-full">
                <h1 className="font-roboto text-3xl mb-5 ml-2 text-left text-white">
                    gitfinder
                </h1>
                <Search />
                <div>
                    {most_liked &&
                        most_liked.map(
                            (
                                obj: {
                                    id: number;
                                    likes: number;
                                    username: string;
                                },
                                index: number
                            ) => {
                                return (
                                    <Liked
                                        key={index}
                                        likes={obj.likes}
                                        avatar={`https://avatars.githubusercontent.com/u/${obj.id}?v=4`}
                                        username={obj.username}
                                    />
                                );
                            }
                        )}
                </div>
            </div>
        </Layout>
    );
}
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const res = await axios.get(`${process.env.API_URL}/api/likes`);
    const most_liked = res.data.most_liked.sort(
        (
            a: {
                id: number;
                likes: number;
            },
            b: {
                id: number;
                likes: number;
            }
        ) => b.likes - a.likes
    );

            console.log(most_liked)
    return {
        props: {
            most_liked,
        },
    };
}
