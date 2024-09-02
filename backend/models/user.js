import bcrypt from 'bcryptjs';
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
        type: Boolean,
        default: false,
        required: true,
    }
},{
    timestamps: true,
});

UserSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

UserSchema.pre('save',async function(next){
    if(this.isModified('password')){
       this.password = await bcrypt.hash(this.password, 8);
    }else{
        next();
    }
})


const User = new model("User", UserSchema);

export default User;