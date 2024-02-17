import Head from "next/head";

interface ICustomHeadProps {
    name: string;
}

export default function CustomHeader (name:ICustomHeadProps) {
    return (
        <Head>
            {/* <link rel="icon" href="/fav-icon.svg" /> */}
            <title>Tomo {name ? ` | ${name}` : ''  }</title>
        </Head>
    )
}