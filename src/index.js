const express = require("express");

const app = express();

// Middleware to add CORS and Cache-Control headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  // 1 day cache.
  res.header("Cache-Control", "public, max-age=86400");

  next();
});

// Register routes
require("./routes/uuid")(app);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server started on port ${port}`));

module.exports = app;
