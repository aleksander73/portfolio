const { Technology } = require('../models');
const { Database } = require('../database');
const fs = require('fs');

class TechnologyService {
    async getTechnologies(filter) {
        return await Database.getInstance().getCollection('technologies', filter);
    }

    async addTechnology(name, icon) {
        const technology = new Technology(name, icon);
        const result = await Database.getInstance().postDocument('technologies', technology);
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
        return Boolean(result.ok);
    }
}

module.exports = Object.freeze(new TechnologyService());
