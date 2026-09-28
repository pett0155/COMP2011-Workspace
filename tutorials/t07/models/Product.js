import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a product title.']
    },
    price: {
        type: Number,
        required: [true, 'A product requires a price.']
    },
    category: {
        type: String,
        required: [true, 'Every product must belong to a category.']
    },
    inStock: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;