const express = require('express');
const router = express.Router();
const { resetData } = require("../controllers");
const db = require("../db");
const { Validator } = require("express-json-validator-middleware");
const { validate } = new Validator();
const { scanSchema } = require("../schemas");
router.get('/order', async function (_, res, _) {
  const drivers = await db.drivers.findMany({
    select: {
      driver: true,
      cluster_rel: true
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
      driver: driver.driver,
      cluster: driver.cluster_rel.cluster,
      packages
    });
  }
  res.send({ drivers_and_vouchers });
});

router.put('/scan', validate({ body: scanSchema }), async function (req, res, next) {
  try {
    const body = req.body;
    await db.scanned_packages.create({
      data: {
        voucher: body.voucher,
        pickedUpBy: body.pickedUpBy
      }
    });
    res.send({
      status: "success", 
      message: "voucher imported successfully" 
    });
  } catch (error) {
    res.send({ error: error.message })
  }
});

router.post('/reset', resetData);
module.exports = router;
