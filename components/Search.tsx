import { useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
export default function Search() {
    const router = useRouter();
    const [error, setError] = useState("");
    const searchRef = useRef<HTMLInputElement>(null);
    return (
        <div className="mb-10 bg-light-blue p-2 rounded-none md:rounded">
            <div className="flex justify-between">
                <input
                    className="w-full rounded bg-light-blue p-2 text-white"
                    type="text"
                    placeholder="Search GitHub Username"
                    onClick={() => setError("")}
                    ref={searchRef}
                />
                <button
                    className="bg-green-500 py-1 px-3 ml-2 rounded"
                    onClick={async () => {
                        if (searchRef.current?.value.trim() === "") {
                            setError("Please enter a username");
                            return;
                        }
                        try {
                            const userRes = await axios.get(
                                `${process.env.NEXT_PUBLIC_API_URL}/api/user/${searchRef.current?.value}`
                            );

                            if (!userRes.data) {
                                throw new Error("User not found");
                            }

                            router.push(`/${searchRef.current?.value}`);
                        } catch (err) {
                            if (searchRef.current) {
                                searchRef.current.value = "";
                            }
                            setError("User not found");
                        }
                    }}
                >
                    Search
                </button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
}
