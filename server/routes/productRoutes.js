const express = require("express");

const router = express.Router();

const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require(
  "../controllers/productController"
);

// Get All Products
router.get("/", getProducts);

// Create Product
router.post("/", createProduct);

// Update Product
router.put(
  "/:id",
  updateProduct
);

// Delete Product
router.delete(
  "/:id",
  deleteProduct
);

module.exports = router;