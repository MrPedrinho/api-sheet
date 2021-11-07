import Head from "next/head"

export default function Header({title, desc}: {title: string, desc?: string}) {

    return (
        <Head>
            <title>{title}</title>
            <meta property="description" content={desc || ""}/>
        </Head>
    )
}