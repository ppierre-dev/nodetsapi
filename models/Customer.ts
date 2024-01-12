import mongoose, { Document, Schema } from "mongoose";

interface CustomerDoc extends Document {
    email: string;
    password: string;
    salt: string;
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
    verified: boolean;
    otp: number;
    otp_expiry: Date;
    lat: number;
    lng: number;
}

const CustomerSchema = new Schema<CustomerDoc>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    address: { type: String, default: "" },
    phone: { type: String, required: true },
    verified: { type: Boolean, default: false },
    otp: { type: Number, required: true },
    otp_expiry: { type: Date, required: true },
    lat: { type: Number, default: 0.0 },
    lng: { type: Number, default: 0.0 },
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

const Customer = mongoose.model<CustomerDoc>("Customer", CustomerSchema);

export { Customer };