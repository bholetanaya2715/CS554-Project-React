const userRoutes = require("./userRoutes");
const foodRoutes = require("./foodRoutes");
const waterRoutes = require("./waterRoutes");

const constructorMethod = (app) => {
  app.use("/api", userRoutes);
  app.use("/api/food", foodRoutes);
  app.use("/api/water", waterRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;
