const fs = require("fs");
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

const date = new Date();
const date_name = date.getFullYear() + "" + helper.format_date(date.getMonth()) + "" + helper.format_date(date.getDate())
    + "" + helper.format_date(date.getHours()) + "" + helper.format_date(date.getMinutes()) + "" + helper.format_date(date.getSeconds());
const file_type = helper.check_extension(filename);
const json_stringify = helper.convert_obj_to_json(filename, file_type);
helper.create_json_file(json_stringify, date_name, file_type);