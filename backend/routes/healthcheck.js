const express = require("express");
const router = express.Router({});

router.get("/", async (_req, res, _next) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
  };
  try {
    res.status(200).json(healthcheck);
  } catch (error) {
    healthcheck.message = error;
    res.status(503).json({ error });
  }
});

module.exports = router;
