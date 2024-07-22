import bcrypt from "bcrypt";
import express from "express";
import { User } from "../models/User.js";
import { Post } from "../models/Post.js";
const userRoute = express.Router();

userRoute.post("/register", async (req, res) => {
  console.log(req.body);
  const { username, password, email, profilePic } = req.body;
  try {
    const userAlreadyExist = await User.findOne({ email });
    if (userAlreadyExist) {
      res.status(409).send({ message: `User with ${email} already exist` });
    } else {
      const newUser = new User({
        username,
        email,
        profilePic,
        password: await bcrypt.hash(password, 10),
      });
      const user = await newUser.save();
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
userRoute.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    // Find user by email
    const user = await User.findOne({ email: req.body.email });
    // Check if user exists
    if (!user) {
      return res.status(404).json({
        message: `User with this Email "${req.body.email}" not found.`,
      });
    }
    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Incorrect password." });
    }
    // If both email and password are correct, return user
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json({ message: "Internal server error." });
  }
});

//UPDATE
userRoute.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can update only your account!");
  }
});

//DELETE
userRoute.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ email: user.email });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("User not found!");
    }
  } else {
    res.status(401).json("You can delete only your account!");
  }
});

//GET USER
userRoute.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

export { userRoute };
