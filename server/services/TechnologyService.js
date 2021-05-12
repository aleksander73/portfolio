const { Technology } = require('../models');
const { Database } = require('../database');

class TechnologyService {
    async getTechnologies(filter) {
        return Database.getInstance().getCollection('technologies', filter);
    }

    async addTechnology(tag, name, icon) {
        const technology = new Technology(tag, name, icon);
        Database.getInstance().postDocument('technologies', technology);
    }
}

module.exports = Object.freeze(new TechnologyService());
