const Reset_service_class = require("../services/reset_service");
const reset_service = new Reset_service_class();
const Ordering_service_class = require("../services/ordering_service");
const ordering_service = new Ordering_service_class();
const Scan_service_class = require("../services/scan_service");
const scan_service = new Scan_service_class();


async function reset_data(_, res, _) {
  try {
    await reset_service.reset();
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

async function order_drivers(_, res, _) {
  try {
    const data = await ordering_service.get_ordered_data();
    res.send({
      status: "success", 
      message: "drivers ordered successfully",
      data
    });
  } catch (error) {
    res.status(400).send({
      status: "failed",
      message: "drivers not ordered successfully",
      error: error.message
    });
  }
}

async function scan_package(req, res, _){
  try {
    const body = req.body;
    await scan_service.scan(body.voucher, body.pickedUpBy);
    res.send({
      status: "success", 
      message: "package scanned successfully" 
    });
  } catch (error) {
    res.status(400).send({
      status: "failed",
      message: "failed to scan the package",
      error: error.message 
    })
  }
}

async function get_drivers_status(_, res, _){
  try {
    const data = await ordering_service.get_drivers_status();
    res.send({
      status: "success", 
      message: "drivers status fetched successfully",
      data
    });
  } catch (error) {
    res.status(400).send({
      status: "failed",
      message: "filed to get the status",
      error: error.message 
    })
  }
}

module.exports = {
  reset_data,
  order_drivers,
  scan_package,
  get_drivers_status
}