import { model, Schema, SchemaTypes} from 'mongoose';

const reviewSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    rating:{
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    user: {
        type: SchemaTypes.ObjectId,
    }
})

const ProductSchema = new Schema({
    user: {
        type: SchemaTypes.ObjectId,
        ref: "User"
    },
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    countInStock: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
        required: true,
    },
    reviews: [reviewSchema]
}, {
    timestamps: true,
});

const Product = new model("Product", ProductSchema);

export default Product;