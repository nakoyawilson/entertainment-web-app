require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const entertainmentRoutes = require("./routes/entertainment");
const userRoutes = require("./routes/user");

const app = express();
const port = process.env.PORT || 5000;

// middleware

app.use(express.json());

// log out the requests coming in
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/entertainment", entertainmentRoutes);
app.use("/api/user", userRoutes);

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
