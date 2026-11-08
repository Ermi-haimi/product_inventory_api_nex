import products from "../data/products.js";
import createError from "../services/createError.js";
function getAllProducts(req, res) {
  res.status(200).json({
    success: true,
    data: products,
  });
}

function getProductById(req, res, next) {
  const prodId = Number(req.params.id);
  const product = products.find((product) => product.id == prodId);

  if (!product) {
    next(createError("Product Not Found", 400));
    return;
  }
  res.status(200).json({
    success: true,
    data: product,
  });
}

function getProductByCategory(req, res, next) {
  const category = req.params.cat;
  const categoryProducts = products.filter(
    (product) =>
      product.category.toLowerCase() === category.toLocaleLowerCase(),
  );

  if (categoryProducts.length === 0) {
    next(createError("No item with the category", 404));
    return;
  }
  res.status(200).json({
    success: true,
    data: categoryProducts,
  });
}
function checkNewProduct(req, res, next) {
  const newProduct = req.body;
  console.log(newProduct);

  if (
    !Object.hasOwn(newProduct, "name") ||
    !Object.hasOwn(newProduct, "price") ||
    !Object.hasOwn(newProduct, "quantity") ||
    !Object.hasOwn(newProduct, "category")
  ) {
    next(createError("All properties must be provided", 400));

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
    next(createError("name and category must be non-empty strings", 400));

    return;
  }
  if (!Number.isInteger(quantity) || quantity < 1) {
    next(createError("quantity must be positive integer", 400));

    return;
  }
  if (!Number.isFinite(price) || price < 0) {
    next(createError("price must be non negative number", 400));

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
}

function addProduct(req, res) {
  const newProduct = req.body;
  products.push(newProduct);
  res.status(201).json({
    success: true,
    data: newProduct,
  });
}

function updateProduct(req, res, next) {
  const productUpdate = req.body;
  const prodId = Number(req.params.id);
  let updateCount = 0;
  if (!Number.isInteger(prodId)) {
    next(createError("invalid id", 400));

    return;
  }
  const product = products.find((prod) => prod.id === prodId);
  if (!product) {
    next(createError("Product Not Found", 404));

    return;
  }

  let updates = {};

  if (Object.hasOwn(productUpdate, "name")) {
    if (
      typeof productUpdate.name !== "string" ||
      productUpdate.name.trim() === ""
    ) {
      next(createError("name should be non empty string", 400));

      return;
    }
    updates.name = productUpdate.name.trim();
    updateCount++;
  }
  if (Object.hasOwn(productUpdate, "category")) {
    if (
      typeof productUpdate.category !== "string" ||
      productUpdate.category.trim() === ""
    ) {
      next(createError("category should be non empty string", 400));

      return;
    }
    updates.category = productUpdate.category.trim();
    updateCount++;
  }

  if (Object.hasOwn(productUpdate, "price")) {
    const price = Number(productUpdate.price);
    if (!Number.isFinite(price) || price < 0) {
      next(createError("price must be non negative integer", 400));

      return;
    }

    updates.price = price;
    updateCount++;
  }
  if (Object.hasOwn(productUpdate, "quantity")) {
    const quantity = Number(productUpdate.quantity);
    if (!Number.isInteger(quantity) || quantity < 0) {
      next(createError("quantity must be non negative integer", 400));

      return;
    }

    updates.quantity = quantity;
    updateCount++;
  }

  if (updateCount === 0) {
    next(createError("all fields are empty", 400));

    return;
  }

  Object.assign(product, updates);
  res.status(200).json({
    success: true,
    data: product,
  });
}

function deleteProduct(req, res, next) {
  const prodId = Number(req.params.id);

  if (!Number.isInteger(prodId)) {
    next(createError("Invalid Id", 400));

    return;
  }

  const product = products.findIndex((prod) => prod.id === prodId);
  if (product !== -1) {
    products.splice(product, 1);
    res.status(200).json({
      success: true,
      message: "product deleted successfully",
    });
    return;
  }
  next(createError("product not found", 404));
}
export {
  getAllProducts,
  getProductById,
  getProductByCategory,
  checkNewProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
