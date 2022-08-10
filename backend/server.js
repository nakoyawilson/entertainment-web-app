require("dotenv").config();
const path = require("path");

const express = require("express");
const mongoose = require("mongoose");
const entertainmentRoutes = require("./routes/entertainment");
const userRoutes = require("./routes/user");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/entertainment", entertainmentRoutes);
app.use("/api/user", userRoutes);

const resolvedDirectory = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(resolvedDirectory, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(resolvedDirectory, "frontend", "build", "index.html")
    )
  );
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`connected to db & listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
