const RedcapAccess = require('../storage/storageAccess/redcapAccess');

module.exports = class controller {
    constructor() {
        this.storageAccess = new RedcapAccess();
    }
}