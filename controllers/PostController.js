import PostService from "../services/PostService.js";

class PostController {
  async create(req, res) {
    try {
      const post = await PostService.create(req.body, req.files.picture);
      res.status(200).json(post);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  async getAll(req, res) {
    try {
      const posts = await PostService.getAll();
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
      const post = await PostService.getOne(req.params.id);
      if (post) {
        return res.status(200).json(post);
      } else {
        return res.json({ message: `No post with id: ${req.params.id}` });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  async update(req, res) {
    try {
      const updatedPost = await PostService.update(req.body);
      return res.status(200).json(updatedPost);
    } catch (e) {
      console.log(e);
      res.status(500).json(e.message);
    }
  }

  async delete(req, res) {
    try {
      const post = await PostService.delete(req.params.id);
      return res.status(200).json(post);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }
}

export default new PostController();
