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

switch (helper.check_extension(filename)) {
    case 1:
        const ini_obj = ini(content);
        try {
            fs.writeFileSync(`php.${date_name}.json`, ini_obj);
            console.log("Json file succefully created");
            process.exit(0)
        } catch(err) {
            console.error(err);
            process.exit(-1);
        }
        break;
    case 2:
        const env_obj = env(content);
        try {
            fs.writeFileSync(`env.${date_name}.json`, env_obj);
            console.log("Json file succefully created");
            process.exit(0)
        } catch(err) {
            console.error(err);
            process.exit(-1);
        }
        break;
   default:
       console.log("something else");
       process.exit(-1);
       break;
}




