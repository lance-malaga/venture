import Head from "next/head";

interface ICustomHeadProps {
    name?: string;
}

export default function CustomHead (props:ICustomHeadProps) {
    return (
        <Head>
            <link rel="icon" href="/icons/logo-black.svg" />
            <title>Venture {props.name ? ` | ${props.name}` : ''  }</title>
        </Head>
    )
}