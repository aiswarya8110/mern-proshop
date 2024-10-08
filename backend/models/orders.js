import { model, Schema, SchemaTypes } from 'mongoose';

const OrderSchema = new Schema({
    user: {
        type: SchemaTypes.ObjectId,
        ref: "User"
    },
    orderItems: [
        {
            name: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
            qty: {
                type: Number,
                required: true,
            },
            product: {
                type: SchemaTypes.ObjectId,
                required: true,
                ref: "Product",
            }
        }
    ],
    shippingAddress: {
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        pinCode: {
            type: Number,
            required: true,
        },
        country: {
            type: String,
            required: true,
        }
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    shippingPrice:{
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    },
    paidAt: {
        type: Date
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false,
    },
    deliveredAt: {
        type: Date,
    },
    PayPalTransactionId: {
        type: String,
    }
},
{
    timestamps: true,
})

const Order = new model("Order", OrderSchema);

export default Order;