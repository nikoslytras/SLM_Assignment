require('dotenv').config()
const express = require('express');
const logger = require('morgan');
const port = process.env.PORT || 8000;
const indexRouter = require('./routes/index');
const { ValidationError } = require("express-json-validator-middleware");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require("../docs/swagger.json");
const app = express();
const { CLUSTER_MODE } = require("./constants");

const cluster = require("cluster");
const os = require("os");

startMaster().catch((error) => {
  console.info(error.message);
});

//this function starts the master of forks multiple workers
async function startMaster() {
  if (process.env.SERVER_MODE === CLUSTER_MODE && cluster.isMaster) {
    let cluster_nodes = process.env.CLUSTER_NODES || os.cpus().length;

    console.info("Master " + process.pid + " is running. Starting " + cluster_nodes + " workers");

    for (let i = 0; i < cluster_nodes; i++) {
      cluster.fork();
    }

    cluster.on("exit", function (worker, code, signal) {
      console.info("------------------------------------------------------------");
      console.info("Host: " +
        os.hostname() +
        " Pid:" +
        worker.process.pid +
        " EXIT. Code: " +
        code +
        " Signal:" +
        signal +
        " Restarting ...");
      cluster.fork();
    });
  } else {
    startWorker();
  }
}

//this function starts the worker
async function startWorker() {
  try {
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    //set the base router
    app.use('/', indexRouter);
    //se the swagger url.
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    // catch 404 errors
    app.use(function (_, res, next) {
      res.send({
        code: 404,
        message: "not found"
      })
      next();
    });

    // error handler
    app.use(function (err, req, res, next) {
      //check if is a validation error
      if (err instanceof ValidationError) {
        res.status(400).send({
          status: "failed",
          message: "validation error",
          error: err.validationErrors
        });
        next();
        return;
      }
      //send back the error
      res.status(err.status || 500);
      res.send({
        status: "failed",
        message: "internal error",
        error: err.message
      });
    });

    //start listening for requests.
    app.listen(port, () => {
      console.info(`Starting server at port: ${port}`)
    });

  } catch (error) {
    console.info("Worker error = ", error.stack);
  }
}

module.exports = app;
