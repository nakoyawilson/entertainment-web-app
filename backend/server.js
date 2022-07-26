const path = require("path");
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const entertainmentRoutes = require("./routes/entertainment");
const userRoutes = require("./routes/user");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/entertainment", entertainmentRoutes);
app.use("/api/user", userRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("/*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`connected to db and listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
