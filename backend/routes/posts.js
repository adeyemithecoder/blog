import express from "express";
import { Post } from "../models/Post.js";
import { User } from "../models/User.js";
const postRoute = express.Router();

//CREATE POST
postRoute.post("/", async (req, res) => {
  console.log(req.body);
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE POST
postRoute.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post._id === req.body._id) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//CATEGORIES
postRoute.get("/cats", async (req, res) => {
  try {
    const distinctCategories = await Post.distinct("categories");
    res.status(200).json(distinctCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST
postRoute.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST
postRoute.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
postRoute.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      // Find the user by username
      const user = await User.findOne({ username });
      console.log(user);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      posts = await Post.find({ author: user._id }).populate(
        "author",
        "username profilePic"
      );
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      }).populate("author", "username profilePic");
    } else {
      posts = await Post.find().populate("author", "username profilePic");
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

export { postRoute };
