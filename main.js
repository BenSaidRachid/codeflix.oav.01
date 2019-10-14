const fs = require("fs");
const ini = require("./parse_ini");
const env = require("./parse_env");
const helper = require("./helpers");

const args = process.argv.slice(2);

if(args.length !== 1) {
    console.log("usage: node main.js <CONFIG_FILENAME>");
    process.exit(0)
}

const filename = args[0];

if (!fs.existsSync(filename)) {
    console.log(`The file ${filename} does not exist.`);
    process.exit(-1)
}

const content = fs.readFileSync(filename, "utf-8");
const date = new Date();
let date_name = date.getFullYear() + "" + helper.format_date(date.getMonth()) + "" + helper.format_date(date.getDate())
    + "" + helper.format_date(date.getHours()) + "" + helper.format_date(date.getMinutes()) + "" + helper.format_date(date.getSeconds());
let json_stringified = "";
const file_type = helper.check_extension(filename);
switch (file_type) {
    case 1:
        json_stringified = ini(content);
        break;
    case 2:
        json_stringified = env(content);
        break;
   default:
       console.log("Error extension: the only extensions accepted are ini and env");
       process.exit(-1);
       break;
}

helper.create_json_file(json_stringified, date_name, file_type);