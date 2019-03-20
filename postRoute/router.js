const express = require("express");

const router = express.Router();
const db = require("./postDb");

router.get("/", async (req, res) => {
  try {
    const posts = await db.get();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await db.getById(id);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
});

router.post("/", async (req, res) => {
  const post = req.body;
  try {
    const incPost = await db.insert(post);
    const newPost = await db.getById(incPost.id);
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await db.getById(id);
    const deleted = await db.remove(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});

router.put("/:id", async (req, res) => {
  const post = req.body;
  const { id } = req.params;
  try {
    const edited = await db.update(id, post);
    const newPost = await db.getById(id);
    res.status(202).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});

module.exports = router;
