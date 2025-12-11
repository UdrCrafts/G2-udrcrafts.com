import { Request, Response } from "express";
import Product from "../models/Product";
import { uploadImage, deleteImage } from "../utils/cloudinary";
import fs from "fs";
import path from "path";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, category } = req.body;

    const images: { url: string; public_id: string }[] = [];

    if (req.files && Array.isArray(req.files)) {
      
      for (const file of req.files as Express.Multer.File[]) {
        if (file.path) {
          const uploadResult: any = await uploadImage(file.path, "products");
          images.push({ url: uploadResult.secure_url, public_id: uploadResult.public_id });
          
          fs.unlink(file.path, (err) => {
            if (err) console.warn("Failed to remove temp file:", err);
          });
        }
      }
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      images
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find().populate("category").sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id).populate("category");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updates = req.body;

    const product = await Product.findByIdAndUpdate(id, updates, { new: true });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.images && product.images.length) {
      for (const img of product.images) {
        try {
          await deleteImage(img.public_id);
        } catch (err) {
          console.warn("Failed to delete image from cloudinary:", err);
        }
      }
    }

    res.json({ message: "Product deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
