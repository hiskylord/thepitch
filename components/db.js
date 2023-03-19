const mongoose = require("mongoose");
const db = mongoose.connect(
  process.env.MGDB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected");
  },
  () => {
    console.log("failed");
  }
);
mongoose.set("strictQuery", false);
export { db, mongoose };
