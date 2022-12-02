const db = require("../db");
const { DRIVER_STATUS } = require("../constants");

module.exports = class Ordering_service {
  constructor() { }
  //returns the drivers and packages that every driver should get.
  async get_ordered_data() {

    const drivers = await db.drivers.findMany({
      select: {
        name: true,
        cluster_rel: true,
      }
    });

    let drivers_and_vouchers = [];

    for (const driver of drivers) {
      const packages = await db.packages.findMany({
        where: {
          postcode: {
            startsWith: driver.cluster_rel.postcodes.split("X")[0]
          }
        }
      });

      drivers_and_vouchers.push({
        driver: driver.name,
        cluster: driver.cluster_rel.cluster,
        packages
      });
    }

    return drivers_and_vouchers;
  }
  //returns the driver status the packages has get and the packages thats remaining to get.
  async get_drivers_status() {
    
    const drivers = await db.drivers.findMany({
      select: {
        name: true,
        cluster_rel: true,
        scanned_packages: true
      }
    });

    let drivers_and_vouchers = [];

    for (const driver of drivers) {
      const packages_to_pick_up = await db.packages.findMany({
        where: {
          postcode: {
            startsWith: driver.cluster_rel.postcodes.split("X")[0]
          },
          scanned_packages: null
        }
      });

      drivers_and_vouchers.push({
        driver: driver.name,
        driver_status: !packages_to_pick_up.length ? DRIVER_STATUS.READY : DRIVER_STATUS.NOT_READY,
        cluster: driver.cluster_rel.cluster,
        packages_to_pick_up,
        picked_up_packages: driver.scanned_packages
      });
    }

    return drivers_and_vouchers;
  }
}