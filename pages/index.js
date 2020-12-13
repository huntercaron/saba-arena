import Head from "next/head"
import { getArenaChannel } from "../lib/api"


// Grabs all the blocks from the are.na channel and repeats the "LinkItem" component per block
// See all the block attributes here https://dev.are.na/documentation/blocks#Block52094

function LinkItem(props) {
    const { block } = props

    const isBlockLink =
        block.source.hasOwnProperty("title") && block.source.hasOwnProperty("url")

    if (!isBlockLink) return null

    return (
        <li className="link-item">
            <a className="inline-block" href={block.source.url} target="_blank" rel="noopener noreferrer">
                {block.generated_title}
            </a>

            <p className="inline-block description">{block.description}</p>

            <p className="inline-block time">{block.created_at.split("T")[0]}</p>
        </li>
    )
}

export default function Home(props) {
    const { blocks } = props

    return (
        <div className="container">
            <Head>
                <title>List of References by Saba</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {blocks.map((block) => (
                <LinkItem key={block.id} block={block} />
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
