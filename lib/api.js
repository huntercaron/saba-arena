const Arena = require("are.na")
let arena = new Arena()

const paginationPer = 64

const options = {
    page: 1,
    per: paginationPer,
    direction: "desc",
    // sort: "position",
}

const getTotalPages = (channel) =>
    Math.ceil(Math.min(channel.length, 500) / paginationPer)

async function fetchChannel(slug, page) {
    const channel = await arena.channel(slug).get({
        page,
        per: paginationPer,
        direction: "desc",
    })
    return channel.contents
}

export async function getArenaChannel(channel) {
    const channelData = await arena.channel(channel).get(options)
    const totalPages = getTotalPages(channelData.contents)

    console.log(channelData)

    const channelSlug = channel ? channel : "great-sites-shv7bj7sqn0"
    const channelRequests = []

    let currentPage = 1
    while (currentPage <= totalPages) {
        channelRequests.push(fetchChannel(channelSlug, currentPage))
        currentPage++
    }

    const channelPages = await Promise.all(channelRequests)
    console.log("Fetched all blocks for a channel")

    return [].concat(...channelPages)
}
