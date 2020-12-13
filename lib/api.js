const Arena = require("are.na")
let arena = new Arena()

const options = {
    page: 1,
    per: 100,
    direction: "desc",
    sort: "position",
}

export async function getArenaChannel(channel) {
    const blocks = await arena.channel(channel).contents(options)

    return blocks
}
