import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>gitfinder</title>
                <meta name="description" content="gitfinder built with ❤" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}
export default MyApp;
