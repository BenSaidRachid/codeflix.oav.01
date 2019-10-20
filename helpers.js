const path = require("path");
const fs = require("fs");
const ini = require("./parse_ini");
const env = require("./parse_env");

exports.format_date = function format_date(date) {
    if(date < 10) return "0" + date;
    return date;
};

exports.convert_obj_to_json = function convert_obj_to_json(filename, file_type) {
    let json_stringify = "";
    const content = fs.readFileSync(filename, "utf-8");
    switch (file_type) {
        case 1:
            json_stringify = ini(content);
            break;
        case 2:
            json_stringify = env(content);
            break;
        default:
            console.log("Error extension: the only extensions accepted are ini and env.");
            process.exit(-1);
            break;
    }
    return json_stringify;
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

exports.check_extension = function check_extension(filename) {
    if(path.extname(filename) === ".ini") return 1;
    else if(filename.replace(/(^.*)(\.env$)/g, "$2") === ".env") return 2;
    else return -1;
};