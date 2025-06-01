const config = require('./Config');
const Environments = require('./Environments');

const dotenv = require('dotenv');
const path = require('path');

class EnvironmentManager {
    static loadEnvironment() {
        const baseEnvPath = path.join(__dirname, 'env');
        let envFilname = '';

        const currentEnvironment = this.currentEnvironment();
        switch(currentEnvironment) {
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

    // ==================================================

    static currentEnvironment() {
        return config.ENV || Environments.DEVELOPMENT;
    }

    static isDevelopment() {
        return this.currentEnvironment() === Environments.DEVELOPMENT;
    }

    static isProduction() {
        return this.currentEnvironment() === Environments.PRODUCTION;
    }
}

module.exports = EnvironmentManager;
