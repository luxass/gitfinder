import Image from "next/image";
import Link from "next/link";
import ThumbsUp from "./ThumbsUp";

type LikedProps = {
    avatar: string;
    username: string;
    likes: number;
};

export default function Liked({ avatar, username, likes }: LikedProps) {
    return (
        <Link href={`/${username}`}>
            <div className="bg-light-blue p-2 my-2 h-15 flex rounded-none md:rounded">
                <Image src={avatar} alt="User avatar" width={48} height={48} />

                <h1 className="mx-5 flex-1 text-green-500">{username}</h1>
                <div className="bg-dark-blue h-8 my-auto w-10 rounded flex justify-around items-center text-green-500">
                    {likes}
                    <ThumbsUp />
                </div>
            </div>
        </Link>
    );
}
