import express from "express";
import products from "../data/products.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: products,
  });
});

router.get("/:id", (req, res) => {
  const prodId = Number(req.params.id);
  const product = products.find((product) => product.id == prodId);

  if (!product) {
    res.status(404).json({
      success: false,
      message: "Product Not Found",
    });
    return;
  }
  res.status(200).json({
    success: true,
    data: product,
  });
});

router.get("/category/:cat", (req, res) => {
  const category = req.params.cat;
  const categoryProducts = products.filter(
    (product) =>
      product.category.toLowerCase() === category.toLocaleLowerCase(),
  );

  if (categoryProducts.length === 0) {
    res.status(404).json({
      success: false,
      message: "No item with the category",
    });
    return;
  }
  res.status(200).json({
    success: true,
    data: categoryProducts,
  });
});

export default router;
