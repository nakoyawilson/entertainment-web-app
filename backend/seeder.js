const mongoose = require("mongoose");
const dotenv = require("dotenv");
const data = require("./data/data.js");
const Entertainment = require("./models/entertainmentModel.js");

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

const importData = async () => {
  try {
    await Entertainment.deleteMany();
    await Entertainment.insertMany(data);
    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Entertainment.deleteMany();
    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
