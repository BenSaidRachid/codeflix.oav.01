const path = require("path");
const fs = require("fs");

exports.format_date = function format_date(date) {
    if(date < 10) return "0" + date;
    return date;
};

exports.check_extension = function check_extension(filename) {
    if(path.extname(filename) === ".ini") return 1;
    else if(filename.replace(/(^.*)(\.env$)/g, "$2") === ".env") return 2;
    else return -1;
};

exports.create_json_file = function create_json_file(json, date, type) {
    let name = "";
    if (type === 1) name = "php";
    else name = "env";
    const file_name = `${name}.${date}.json`;
    try {
        fs.writeFileSync(file_name, json);
        console.log(`File '${file_name}' has been succefully created`);
        process.exit(0)
    } catch(err) {
        console.error("An error occurred\n",err);
        process.exit(-1);
    }
};