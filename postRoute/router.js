const express = require("express");

const router = express.Router();
const db = require("./postDb");

router.get("/", async (req, res) => {
  try {
    const posts = await db.get();
    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "The posts information could not be retrieved." });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await db.getById(id);
    if (post) {
      res.status(200).json(post);
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "The post information could not be retrieved." });
  }
});

router.post("/", async (req, res) => {
  const post = req.body;
  try {
    const newPost = await db.insert(post);
    if (newPost) {
      res.status(200).json(newPost);
    } else {
      res.status(500).json({
        message: "There was an error while saving the post to the database"
      });
    }
  } catch (error) {
   res.status(500).json({ message: "Something went wrong when you made your request"})
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await db.getById(id);
    if (post) {
      const deleted = await db.remove(id);
      if (deleted) {
        res.status(201).json(post);
      } else {
        res.status(500).json({ error: "The post could not be removed" });
      }
    } else {
      res
    .status(404)
    .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    res
    .status(500)
    .json({ message: "Something went wrong when you made your request." });
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
