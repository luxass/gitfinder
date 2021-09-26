import Avatar from "./Avatar";
import ThumbsUp from "./ThumbsUp";
import Mail from "./Mail";
import Location from "./Location";
import Twitter from "./Twitter";
import Building from "./Building";

type UserProps = {
    user: {
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
    };
};

export default function User({ user }: UserProps) {
    const company: string = user.company || "Not Available";
    return (
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

                    <p>{user.following}</p>
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
                    <p className="inline-block ml-3">
                        {company === "Not Available"
                            ? "Not Available"
                            : `@${company}`}
                    </p>
                </div>
            </div>
        </div>
    );
}
