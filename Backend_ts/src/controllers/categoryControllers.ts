import { Request, Response } from "express";
import Category from "../models/Category";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const existing = await Category.findOne({ name });
    if (existing) return res.status(400).json({ message: "Category already exists" });

    const category = await Category.create({ name, description });
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const category = await Category.findById(id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const category = await Category.findByIdAndUpdate(id, updates, { new: true });
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const category = await Category.findByIdAndDelete(id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
