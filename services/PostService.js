import Post from "../models/Post.js";
import fileService from "../services/fileService.js";

class PostService {
  async create(post, picture) {
    const fileName = fileService.saveFile(picture);
    const createdPost = await Post.create({ ...post, picture: fileName });
    return createdPost;
  }

  async getAll(req, res) {
    const posts = await Post.find();
    if (posts.length > 0) {
      return posts;
    }
  }

  async getOne(id) {
    if (!id) {
      throw new Error("ID is required");
    }
    const post = await Post.findById(id);
    if (post) {
      return post;
    }
  }

  async update(post) {
    if (!post._id) {
      throw new Error("ID is required");
    }
    const updatedPost = await Post.findByIdAndUpdate(post._id, post, {
      new: true,
    });
    return updatedPost;
  }

  async delete(id) {
    if (!id) {
      throw new Error("ID is required");
    }
    const deletedPost = await Post.findByIdAndDelete(id);
    return deletedPost;
  }
}

export default new PostService();
