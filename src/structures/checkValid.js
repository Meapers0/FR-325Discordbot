const config = require('../../config.json');

async function checkValid() {
    if (!config.clientId) {
        throw ReferenceError(
            console.log('clientId was not found!'));
    }
    if (!config.guildId) {
        throw ReferenceError(
            console.log('guiildId was not found!'));
    }
    if (!config.token) {
        throw ReferenceError(
            console.log('token was not found!'));
    }
    if (!config.logsId) {
        throw ReferenceError(
            console.log('logsId was not found!'));
    }
}

module.exports = { checkValid };