class Utility {
    constructor() {}

    config() {
        Array.prototype.diff = function(arr) {
            return this.filter(x => !arr.includes(x));
        };
    }
}

module.exports = Object.freeze(new Utility());
