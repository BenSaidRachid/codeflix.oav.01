module.exports = function parseEnv(content) {
    const tab = content.match(/^([\w]+)=(.+)/gm,);
    let json = {};

    for (const line of tab) {
        const [key, value] = line.split("=")
        json[key] = value
    }
    return JSON.stringify(json, null, 4);
}