// const jsonWeb = require("jsonwebtoken");
import jsonWeb from "jsonwebtoken";
const generateToken = async (id) => {
  let token = jsonWeb.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "24h", // expires in 24 hours
  });
  return token;
};
export default generateToken;
// module.exports = generateToken;
