const { Technology } = require('../models');
const { cache } = require('../cache');
const { Database } = require('../database');
const fs = require('fs');

class TechnologyService {
    async getTechnologies(filter) {
        const cached = cache.get('technologies');
        if(cached) {
            return cached;
        } else {
            const technologies = await Database.getInstance().getCollection('technologies', filter);
            cache.set('technologies', technologies);
            return technologies;
        }
    }

    async addTechnology(name, icon) {
        const technology = new Technology(name, icon);
        const result = await Database.getInstance().postDocument('technologies', technology);
        cache.set('technologies', await Database.getInstance().getCollection('technologies'));
        return result.ops[0];
    }

    async editTechnology(_id, name, icon, deletedIcon, uploadedIcon) {
        if(deletedIcon) {
            fs.unlinkSync(`${__dirname}/../uploads/${deletedIcon}`);
        }
        const { result } = await Database.getInstance().updateDocument('technologies', _id, {
            name,
            icon: [icon].diff(deletedIcon ? [deletedIcon] : []).concat(uploadedIcon ? [uploadedIcon] : [])[0]
        });
        cache.set('technologies', await Database.getInstance().getCollection('technologies'));
        return Boolean(result.ok);
    }
}

module.exports = Object.freeze(new TechnologyService());
