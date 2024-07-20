import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: String,
        default: false,
        required: true,
    }
},{
    timestamps: true,
});

const User = new model("User", UserSchema);

export default User;