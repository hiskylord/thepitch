const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
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

export { db, mongoose };
