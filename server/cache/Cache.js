const NodeCache = require('node-cache');

const cache = new NodeCache({
    useClones: false
});

module.exports = Object.freeze(cache);
