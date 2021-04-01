import Router from "express";
import Post from "../models/Post.js";
import PostController from "../controllers/PostController.js";
const router = new Router();

//localhost:3000/api
router.get("/", (req, res) => res.status(200).json("Server working"));

//localhost:3000?a=1&b=2
router.get("/query", (req, res) => {
  console.log("req.query", req.query);
  res.status(200).json(req.query);
});

//http://localhost:3000/post
router.post("/post", (req, res) => {
  console.log("req.body", req.body);
  res.status(200).json(req.body);
});

//http://localhost:3000/api/posts/
router.get("/posts", PostController.getAll);

//http://localhost:3000/api/posts/ => Postman
//post + body + raw + json + {"author": "author", "title": "title", "content": "content"}
router.post("/posts", PostController.create);

//http://localhost:3000/api/posts/606611f3c5b0794ca8b29b18
router.get("/posts/:id", PostController.getOne);

//http://localhost:3000/post => postman => put + body + raw + json
//{
//     "_id": "606611f3c5b0794ca8b29b18",
//     "author": "author2",
//     "title": "title2",
//     "content": "content2",
//     "__v": 0
// }
router.put("/posts", PostController.update);

router.delete("/posts/:id", PostController.delete);

export default router;
