import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description?: string;
  price?: number;
  category: mongoose.Types.ObjectId;
  images?: {
    url: string;
    public_id: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String },
    price: { type: Number, default: 0 },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    images: [
      {
        url: String,
        public_id: String
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", ProductSchema);
