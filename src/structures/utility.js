function parseNumber(input) {
    if (typeof input === 'string') return Number(input.replace(/[^\d.]+/g, '')) || 0;
    return Number(input) || 0;
}

module.exports = {
    parseNumber,
};