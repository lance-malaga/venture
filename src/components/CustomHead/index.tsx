import Head from "next/head";

interface ICustomHeadProps {
    name: string;
}

export default function CustomHead (name:ICustomHeadProps) {
    return (
        <Head>
            <link rel="icon" href="/icons/logo-black.svg" />
            <title>Tomo {name ? ` | ${name}` : ''  }</title>
        </Head>
    )
}