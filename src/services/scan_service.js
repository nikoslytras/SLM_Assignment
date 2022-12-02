const db = require("../db");

module.exports = class Scan_service {
    constructor() { }
    // scans a package that a driver has picked up.
    async scan(voucher, pickedUpBy) {
        await db.scanned_packages.create({
            data: {
                voucher,
                pickedUpBy
            }
        });
    }
}