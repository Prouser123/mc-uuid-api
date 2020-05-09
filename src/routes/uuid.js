const loadBalancer = require("../loadBalancer");

module.exports = (app) => {
  app.get("/v1/uuid/:username", async (req, res) => {
    const data = await loadBalancer(req.params.username);

    console.log(data);

    if (!data.ok) {
      res.status(data.code).send({ error: data.msg });
    } else {
      // UUID resolved correctly
      res.status(200).send({
        id: data.uuid,
        name: req.params.username,
        server: data.server,
      });
    }
  });
};
