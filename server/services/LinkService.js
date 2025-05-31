const { Link } = require('../models');
const { cache } = require('../cache');
const { Database } = require('../database');

class LinkService {
    async getLinks(filter) {
        const cached = cache.get('links');
        if(cached) {
            return cached;
        } else {
            const links = await Database.getInstance().getCollection('links', filter);
            cache.set('links', links);
            return links;
        }
    }

    async addLink(name, url, logo, priority) {
        const link = new Link(name, url, logo, priority);
        const result = await Database.getInstance().postDocument('links', link);
        cache.set('links', await Database.getInstance().getCollection('links'));
        return result.ops[0];
    }

    async editLink(_id, name, url, logo, priority) {
        const { result } = await Database.getInstance().updateDocument('links', _id, {
            name,
            url,
            logo,
            priority
        });
        cache.set('links', await Database.getInstance().getCollection('links'));
        return Boolean(result.ok);
    }
}

module.exports = Object.freeze(new LinkService());
