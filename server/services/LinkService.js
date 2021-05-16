const { Link } = require('../models');
const { Database } = require('../database');
const fs = require('fs');

class LinkService {
    async getLinks(filter) {
        return Database.getInstance().getCollection('links', filter);
    }

    async addLink(name, url, logo, priority) {
        const link = new Link(name, url, logo, priority);
        const result = await Database.getInstance().postDocument('links', link);
        return result.ops[0];
    }

    async editLink(_id, name, url, logo, deletedLogo, uploadedLogo, priority) {
        if(deletedLogo) {
            fs.unlinkSync(`${__dirname}/../uploads/${deletedLogo}`);
        }
        const { result } = await Database.getInstance().updateDocument('links', _id, {
            name,
            url,
            logo: [logo].diff(deletedLogo ? [deletedLogo] : []).concat(uploadedLogo ? [uploadedLogo] : [])[0],
            priority
        });
        return Boolean(result.ok);
    }
}

module.exports = Object.freeze(new LinkService());
