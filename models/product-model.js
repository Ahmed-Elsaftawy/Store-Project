import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name Is required"]
    },
    price: {
        type: Number,
        required: [true, "Prise is requried"]
    },
    company: {
        type: String,
        required: [true, "company is requried"],
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{VALUES} is not supported',
        },

    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    feature: {
        type: Boolean,
        default: false,
    },
    rating: {
        type: Number,
        default: 4.5
    }
})

const productModle = mongoose.model("Product", productSchema);

export { productModle };