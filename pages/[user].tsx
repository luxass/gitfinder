import axios from "axios";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Layout from "../components/Layout";
import User from "../components/User";
export default function GitUser({
    user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Layout>
            <div className="max-w-3xl w-full md:w-2/3">
                <h1 className="font-roboto text-3xl mb-5 ml-2 text-left text-white">
                    gitfinder
                </h1>
                <User user={user} />
            </div>
        </Layout>
    );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    try {
        const { user } = ctx.query;
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${user}`);

        return {
            props: {
                user: res.data,
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
