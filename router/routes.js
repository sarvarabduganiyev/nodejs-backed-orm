const { Router } = require("express");
const router = Router();
const authMiddlewere = require("../middleware/auth");

// controller imports

const postsRoute = require("../controllers/posts");
const users = require("../controllers/register");
const login = require("../controllers/login");

// route connect....

// posts-routes
router.get("/posts", postsRoute.getPosts);
router.get("/post/:id", postsRoute.getPostById);
router.post("/post", authMiddlewere, postsRoute.createPost);
router.put("/post/:id", authMiddlewere, postsRoute.editPost);
router.delete("/post/:id", authMiddlewere, postsRoute.deletePost);

// register-route
router.get("/register", authMiddlewere, users.getUsers);
router.post("/register", users.addUser);
router.delete("/register/:id", authMiddlewere, users.deleteUser);

// login-route
router.post("/login", login.auth);

module.exports = router;
