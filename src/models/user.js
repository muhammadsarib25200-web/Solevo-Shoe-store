import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type : String,
        required : [true, "name is required"],
        minlength : 3,
        maxlength : 20,
    },
    email:{
        type : String,
        lowercase : true,
        required : [true, "email is required"],
        unique : true
    },
    password: {
        type : String,
        required : [true, 'password is required'],
        minlength : 4,
       
    },
},
{ timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;