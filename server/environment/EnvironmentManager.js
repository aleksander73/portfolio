const config = require('./Config');
const Environments = require('./Environments');

const dotenv = require('dotenv');
const path = require('path');

class EnvironmentManager {
    static loadEnvironment() {
        const baseEnvPath = path.join(__dirname, 'env');
        let envFilname = '';
        const { ENV } = config;
        switch(ENV) {
            case Environments.DEVELOPMENT: {
                envFilname = '.env.development';
                break;
            }
            case Environments.PRODUCTION: {
                envFilname = '.env.production';
                break;
            }
        }

        // Load the environment
        const environmentPath = path.join(baseEnvPath, envFilname);
        dotenv.config({
            path: environmentPath
        });
    }
}

module.exports = EnvironmentManager;
