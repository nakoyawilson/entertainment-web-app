require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const entertainmentRoutes = require("./routes/entertainment");

const app = express();
const port = process.env.PORT;

// middleware

app.use(express.json());

// log out the requests coming in
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/entertainment", entertainmentRoutes);

// Connect to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(port, () => {
      console.log(`connected to db and listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
