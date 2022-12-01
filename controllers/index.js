const db = require("../db");
const { insertClusters, insertDrivers, insertPackage } = require("../test_data");
async function resetData(_, res, _) {
  try {
    await db.drivers.deleteMany();
    await db.clusters.deleteMany();
    await db.packages.deleteMany();
    await insertPackage(db);
    await insertClusters(db);
    await insertDrivers(db);

    res.send({
      status: "success",
      message: "data reseated successfully"
    });
  } catch (error) {
    res.status(400).send({
      status: "failed",
      message: "data not reseated successfully",
      error: error.message
    });
  }
}

module.exports = {
  resetData
}