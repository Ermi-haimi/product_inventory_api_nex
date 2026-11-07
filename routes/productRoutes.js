import express from "express";
import products from "../data/products.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: products,
  });
});

export default router;
