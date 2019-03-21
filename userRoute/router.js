const express = require("express");

const router = express.Router();
const db = require("./userDb.js");

function capitalName(req, res, next) {
  let name = req.body.name;
  if (name === name.toUpperCase()) {
    next();
  } else {
    req.body.name = name.toUpperCase();
    next();
  }
}

router.get("/", async (req, res) => {
  try {
    const users = await db.get();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "The user information could not be retrieved." });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await db.getById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({ message: "The user's information could not be retrieved." });
  }
});

router.get("/:id/posts", async (req, res) => {
  const { id } = req.params;
  try {
    const posts = await db.getUserPosts(id);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "The user's posts could not be retrieved." });
  }
});

router.post("/", capitalName, async (req, res) => {
  const user = req.body;
  try {
    const newUser = await db.insert(user);
    if (newUser) {
      res.status(201).json(newUser);
    } else {
      res.status(500).json({
        message: "There was an error while saving the post to the database"
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong when you made your request" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await db.getById(id);
    if (user) {
      const deleted = await db.remove(id);
      if (deleted) {
        res.status(200).json(user);
      } else {
        res.status(500).json({ error: "The post could not be removed" });
      }
    } else {
      res
    .status(404)
    .json({ message: "The user with the specified ID does not exist." });
    }
    
  } catch (error) {
    res.status(500).json({ message: "Something went wrong when you made your request." });
  }
});

router.put("/:id", capitalName, async (req, res) => {
  const user = req.body;
  const { id } = req.params;
  if (!user.name) {
    res
      .status(400)
      .json({ message: "Please provide a name for this user" });
  } else {
    try {
      const newUser = await db.getById(id);
      if (newUser) {
        const edited = await db.update(id, user);
        if (edited) {
          res.status(200).json(newUser);
        } else {
          res.status(500).json({
            message: "The post information could not be modified."
          });
        }
      } else {
        res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
      }
    } catch (error) {
      res.status(500).json({ message: "Something went wrong when you made your request." });
    }
  }
});

module.exports = router;
