import Post from "../models/Post.js";

class PostController {
  async create(req, res) {
    try {
      const { author, title, content, picture } = req.body;
      const post = await Post.create({ author, title, content, picture });
      res.status(200).json(post);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  async getAll(req, res) {
    try {
      const posts = await Post.find();
      if (posts.length > 0) {
        return res.status(200).json(posts);
      }
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: "ID is required" });
      }
      const post = await Post.findById(id);
      if (post) {
        return res.status(200).json(post);
      }
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  async update(req, res) {
    try {
      const post = req.body;
      if (!post._id) {
        return res.status(400).json({ message: "ID is required" });
      }
      const updatedPost = await Post.findByIdAndUpdate(post._id, post, {
        new: true,
      });
      return res.status(200).json(updatedPost);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: "ID is required" });
      }
      const post = await Post.findByIdAndDelete(id);
      return res.status(200).json(post);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }
}

export default new PostController();
