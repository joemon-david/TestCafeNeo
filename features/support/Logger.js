var log4js = require("log4js")

log4js.configure('./config/log4js.json');

const getLogger = (className) =>{
    return log4js.getLogger(className);
}

module.exports = {getLogger}