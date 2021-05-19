import express from "express";
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("<h5>Welcome to SuperSelf api</h5>");
});

export default router;
