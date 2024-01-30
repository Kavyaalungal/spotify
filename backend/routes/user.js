import express from "express";
import Users from "../Models/User.js";
import generateToken from "../helper/generateToken.js";
import jsonWeb from "jsonwebtoken";

 import bcrypt from "bcrypt";

const router = express.Router();

router.post("/login", async (req, res) => {
  console.log(req.body);

  const { username, password } = req.body;

  try {
    let user = await Users.findOne({ username });
    console.log(user);
    if (!user) {
      user = await Users.findOne({ email: username });
    }

    if (!user) {
      return res.json({ success: false, message: "Invalid Credentials" });
    } else {
      const verify = await bcrypt.compare(password, user.password);
      if (!verify)
        return res.json({ success: false, message: "Invalid Credentials" });
      else {
        let token = await generateToken(user._id);
        console.log(token, user);

        return res.json({
          success: true,
          token,
          user,
          message: "login successful",
        });
      }
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
});

router.post("/register", async (req, res) => {
  console.log(req.body);
  const { email, username, password, DOB, gender } = req.body;

  if (!email || !username || !password || !DOB || !gender)
    return res.json({ success: false, message: "All fields are required" });
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await Users.create({
      email,
      username,
      password: hash,
      DOB,
      gender,
    });
    console.log(user);
    if (user) {
      let token = await generateToken(user._id);

      console.log(token);
      res.json({ success: true, message: "User Created", user, token });
    } else {
      res.json({ success: false, message: "Some error creating Account" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "internal server error" });
  }
});

router.get("/me", async (req, res) => {
  try {
    const { token } = req.headers;
    if (!token)
      return res
        .status(401)
        .json({ success: true, message: "user Unauthorized" });

    const data = jsonWeb.verify(token, process.env.JWT_SECRET);

    const user = await Users.findById(data.id);
    if (user) {
      return res.json({ user, success: true, message: "user found" });
    } else {
      return res.status(404).json({ success: true, message: "user not found" });
    }
  } catch (error) {
    res.json({
      success: false,
      message: "session has expire please login again",
    });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json({ success: true, users, message: "Users found" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

export default router;
