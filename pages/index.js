import Head from "next/head"
import { getArenaChannel } from "../lib/api"

// Grabs all the blocks from the are.na channel and repeats the "LinkItem" component per block
// See all the block attributes here https://dev.are.na/documentation/blocks#Block52094

function LinkItem(props) {
    const { block } = props
    const { source } = block

    const isBlockLink =
        source.hasOwnProperty("title") && source.hasOwnProperty("url")

    if (!isBlockLink) return null

    return (
        <li className="link-item">
            <a href={source.url} target="_blank" rel="noopener noreferrer">
                {source.title}
            </a>

            <p>{block.created_at}</p>
        </li>
    )
}

export default function Home(props) {
    const { blocks } = props

    return (
        <div className="container">
            <Head>
                <title>Saba</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {blocks.map((block) => (
                <LinkItem block={block} />
            ))}
        </div>
    )
}

export async function getStaticProps() {
    const blocks = await getArenaChannel("great-sites-shv7bj7sqn0")

    return {
        props: {
            blocks,
        },
        revalidate: 1,
    }
}
