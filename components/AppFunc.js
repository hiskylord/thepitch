import { db, mongoose } from "/components/db";
const users = require("/schemas/Users");
const orders = require("/schemas/Orders");

let Strtolink = (str) => {
    return str
      .toString()
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .replace(/\s/g, "-");
};
  
export {
    Strtolink
}