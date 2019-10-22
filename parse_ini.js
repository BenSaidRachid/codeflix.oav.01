module.exports = function parseINI(content) {
    const lines_cleaned = content.trim().replace(/;+.*/gm, "")
        .replace(/^(.+)(=)/gm, "$1 $2 ")
        .replace(/ +/gm, ' ');

    const content_tab = lines_cleaned.match(/^(\[.*\])|^(.+)=(.+)/gm);
    let json_tab = {};
    let key_category = "";
    for (const line of content_tab) {
        let json = {};
        if (line.match(/^\[(.*)\]/gm)) {
            key_category = line.replace(/^\[(.*)\]/gm, "$1");
            json_tab[key_category] = [];
        } else {
            const [key, value] = splitFirstOccurrence(line, "=");
            json[key.trim()] = value.replace(/\"(.*)\"/gm, "$1");
            json_tab[key_category].push(json)
        }
    }
    return JSON.stringify(json_tab, null, 4);
};

function splitFirstOccurrence(str, separator) {
    let firstOccurrence = str.split(separator, 1);
    let remainderOccurrence = str.split(separator);
    remainderOccurrence.shift();
    firstOccurrence.push(remainderOccurrence.join(separator).trim());
    return firstOccurrence;
}