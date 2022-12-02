const db = require("../db");
const { insertClusters, insertDrivers, insertPackage } = require("../../test_data");

module.exports = class Reset_service {
    constructor(){
        this.db = db
    }
    // resets the state of db to retest.
    async reset() {
        await this.db.scanned_packages.deleteMany();
        await this.db.drivers.deleteMany();
        await this.db.clusters.deleteMany();
        await this.db.packages.deleteMany();
        await insertPackage(this.db);
        await insertClusters(this.db);
        await insertDrivers(this.db);
    }
}