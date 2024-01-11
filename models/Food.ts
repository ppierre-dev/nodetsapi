import mongoose, { Document, Schema } from "mongoose";

interface FoodDoc extends Document {
    restaurantId: string;
    name: string;
    description: string;
    category: string;
    foodType: string;
    readyTime: number;
    price: number;
    rating: number;
    images: [string];
}

const FoodSchema = new Schema<FoodDoc>({
    restaurantId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    category: { type: String, required: true },
    foodType: { type: String, required: true },
    readyTime: { type: Number, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0.0 },
    images: { type: [String], default: [] },
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret, options) {
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
        },
    }
});

const Food = mongoose.model<FoodDoc>("Food", FoodSchema);

export { Food };