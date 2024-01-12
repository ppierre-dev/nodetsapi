import mongoose, { Document, Schema } from "mongoose"

//Document structure for Restaurant
interface RestaurantDoc extends Document {
    name: string;
    ownerName: string;
    foodTypes: [string];
    postalCode: string;
    address: string;
    phone: string;
    email: string;
    password: string;
    salt: string;
    serviceAvailable: boolean;
    coverImage: [string];
    rating: number;
    foods: [any];
}

//Shema for Restaurant
const RestaurantSchema = new Schema<RestaurantDoc>({
    name: { type: String, required: true },
    ownerName: { type: String, required: true },
    foodTypes: { type: [String], default: [] },
    postalCode: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    serviceAvailable: { type: Boolean, default: false },
    coverImage: { type: [String], default: [] },
    rating: { type: Number, default: 0.0 },
    foods: { type: [Schema.Types.ObjectId], ref: "Food", default: [] },
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret, options) {
            delete ret.password;
            delete ret.salt;
            delete ret.createdAt;
            delete ret.updatedAt;
            delete ret.__v;
        },
    }
});

//Model for Restaurant
const Restaurant = mongoose.model<RestaurantDoc>("Restaurant", RestaurantSchema);

export { Restaurant };