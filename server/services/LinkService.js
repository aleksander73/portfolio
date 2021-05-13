const { Link } = require('../models');
const { Database } = require('../database');

class LinkService {
    async getLinks(filter) {
        return Database.getInstance().getCollection('links', filter);
    }

    async addLink(name, logo, priority) {
        const link = new Link(name, logo, priority);
        Database.getInstance().postDocument('links', link);
    }
}

module.exports = Object.freeze(new LinkService());
