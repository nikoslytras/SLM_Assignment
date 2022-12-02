const express = require('express');
const router = express.Router();
const { reset_data, order_drivers, scan_package, get_drivers_status } = require("../controllers");
const { Validator } = require("express-json-validator-middleware");
const { validate } = new Validator();
const { scanSchema } = require("../schemas");

router.get('/order', order_drivers);

router.put('/scan', validate({ body: scanSchema }), scan_package);

router.get('/status', get_drivers_status);

router.delete('/reset', reset_data);

module.exports = router;
