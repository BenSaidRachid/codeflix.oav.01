const path = require("path");
const fs = require("fs");
const ini = require("./parse_ini");
const env = require("./parse_env");
const format_date = require("./helpers");

const args = process.argv.slice(2);

if(args.length !== 1) {
    console.log("usage: node main.js <CONFIG_FILENAME>");
    process.exit(0)
}

const filename = args[0];

//Step1 : check if extension is .env or .ini
if (!fs.existsSync(filename)) {
    console.log(`The file ${filename} does not exist.`);
    process.exit(-1)
}
const content = fs.readFileSync(filename, "utf-8");


const env_obj = env(content);
const date = new Date();
let date_name = "";
date_name = date.getFullYear() + "" + format_date(date.getMonth()) + "" + format_date(date.getDate()) 
+ "" + format_date(date.getHours()) + "" + format_date(date.getMinutes()) + "" + format_date(date.getSeconds())
try {
    fs.writeFileSync(`env.${date_name}.json`, env_obj);
  } catch(err) {
    // An error occurred
    console.error(err);
  }