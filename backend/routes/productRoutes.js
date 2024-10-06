import express from "express";
const router = express.Router();
import asyncHandler from "../middleware/asyncHandler.js";
import Product from '../models/productModel.js';
// import products from '../data/products.js'; //data from local JS file

router.get('/', asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
}));
router.get('/:id', asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  // const product = products.find((p) => p._id === req.params.id); handing array from local JS file
  if(product){
   return res.json(product);
  }
  res.status(404).json({message: 'Product not found'});
}));


export default router;