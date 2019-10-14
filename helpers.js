const path = require("path");


exports.format_date = function format_date(date) {
    if(date < 10) return "0" + date;
    return date;
};

exports.check_extension = function check_extension(filename) {
    if(path.extname(filename) === ".ini") return 1;
    else if(filename.replace(/(^.*)(\.env$)/g, "$2") === ".env") return 2;
    else return -1;
};