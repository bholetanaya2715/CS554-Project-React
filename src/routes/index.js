const userRoutes = require("./userRoutes");
const foodRoutes = require("./foodRoutes");
const waterRoutes = require("./waterRoutes");
const pdfRoutes = require("./pdfRoutes")

const constructorMethod = (app) => {
  app.use("/api", userRoutes);
  app.use("/api/food", foodRoutes);
  app.use("/api/water", waterRoutes);
  app.use("/web", pdfRoutes)

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;
