const express = require("express");
const router = express.Router();
const Products = require("../models/products");

// ✅ 1. Search product by name (case-insensitive)
router.get("/search", async (req, res) => {
  const query = req.query.q?.trim();
  try {
    const products = await Products.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ]
    });

    if (!products.length) {
      return res.status(404).json({ error: "No products found" });
    }

    res.json(products);
  } catch (error) {
    console.error("❌ Error during search:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ 2. Single product by ID
router.get("/product/:id", async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (error) {
    console.error("❌ Error fetching product:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ 3. Products by Category ID (Keep below the above!)
router.get("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const products = await Products.find({ category_id: categoryId });
    res.json(products);
  } catch (error) {
    console.error("❌ Error fetching category products:", error);
    res.status(500).json({ error: "Error fetching products" });
  }
});

module.exports = router;
