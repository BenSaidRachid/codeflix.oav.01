module.exports = function format_date(date) {
    if(date < 10) return "0" + date;
    return date;
}