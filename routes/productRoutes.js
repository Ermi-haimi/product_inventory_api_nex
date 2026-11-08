import express from "express";
import {
  addProduct,
  checkNewProduct,
  deleteProduct,
  getAllProducts,
  getProductByCategory,
  getProductById,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getAllProducts);

router.get("/:id", getProductById);

router.get("/category/:cat", getProductByCategory);

router.post("/", checkNewProduct, addProduct);

router.patch("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;
