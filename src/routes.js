const processRoutes = require("./api/process");
const plaintiffRoutes = require("./api/plaintiff");
const defendantRoutes = require("./api/defendant");
const courtRoutes = require("./api/court");

const routes = (app) => {
  app.use("/api/processes", processRoutes);
  app.use("/api/plaintiffs", plaintiffRoutes);
  app.use("/api/defendants", defendantRoutes);
  app.use("/api/courts", courtRoutes);
};

module.exports = routes;
