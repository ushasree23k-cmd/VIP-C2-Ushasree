const Product = require("../models/Product");

// Get All Products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Create Product
const createProduct = async (
  req,
  res
) => {
  try {
    const {
      name,
      price,
      description,
      image,
      category,
      stock,
    } = req.body;

    const product =
      await Product.create({
        name,
        price,
        description,
        image,
        category,
        stock,
      });

    res.status(201).json(product);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Product
const updateProduct = async (
  req,
  res
) => {
  try {
    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        message:
          "Product not found",
      });
    }

    product.name =
      req.body.name ||
      product.name;

    product.price =
      req.body.price ||
      product.price;

    product.description =
      req.body.description ||
      product.description;

    product.image =
      req.body.image ||
      product.image;

    product.category =
      req.body.category ||
      product.category;

    product.stock =
      req.body.stock ||
      product.stock;

    const updatedProduct =
      await product.save();

    res.json(updatedProduct);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Product
const deleteProduct = async (
  req,
  res
) => {
  try {
    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        message:
          "Product not found",
      });
    }

    await Product.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Product deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};