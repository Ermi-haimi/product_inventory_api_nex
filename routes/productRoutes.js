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

router.post(
  "/",
  (req, res, next) => {
    const newProduct = req.body;
    console.log(newProduct);

    if (
      !Object.hasOwn(newProduct, "name") ||
      !Object.hasOwn(newProduct, "price") ||
      !Object.hasOwn(newProduct, "quantity") ||
      !Object.hasOwn(newProduct, "category")
    ) {
      res.status(400).json({
        success: false,
        message: "All properties must be provided",
      });
      return;
    }

    const price = Number(newProduct.price);
    const quantity = Number(newProduct.quantity);
    if (
      typeof newProduct.name !== "string" ||
      newProduct.name.trim() === "" ||
      typeof newProduct.category !== "string" ||
      newProduct.category.trim() === ""
    ) {
      res.status(400).json({
        success: false,
        message: "name and category must be non-empty strings",
      });
      return;
    }
    if (!Number.isInteger(quantity) || quantity < 1) {
      res.status(400).json({
        success: false,
        message: "quantity must be positive integer",
      });
      return;
    }
    if (!Number.isFinite(price) || price < 0) {
      res.status(400).json({
        success: false,
        message: "price must be non negative number",
      });
      return;
    }
    const idArray = products.map((prod) => {
      return prod.id;
    });

    newProduct.id = idArray.length > 0 ? Math.max(...idArray) + 1 : 1;
    newProduct.name = newProduct.name.trim();
    newProduct.category = newProduct.category.trim();
    newProduct.price = price;
    newProduct.quantity = quantity;
    next();
  },
  (req, res) => {
    const newStudent = req.body;
    products.push(newStudent);
    res.status(201).json({
      success: true,
      data: newStudent,
    });
  },
);

export default router;
