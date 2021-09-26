import Image from "next/image";

export default function Avatar({ url }: { url: string }) {
    return (
        <Image
            className="rounded-full"
            src={url}
            alt="User avatar"
            height={100}
            width={100}
        />
    );
}
