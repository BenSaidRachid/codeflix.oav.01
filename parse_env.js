module.exports = function parseENV(content) {
    const content_tab = content.match(/^([\w]+)=(.+)/gm,);
    let json = {};

    for (const line of content_tab) {
        const [key, value] = line.split("=");
        json[key] = value;
    }
    return JSON.stringify(json, null, 4);
};