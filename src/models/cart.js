// import mongoose from "mongoose";
// const CartItemSchema = new mongoose.Schema({
//      product : {
//         type : Number,
//       //   ref : "products",
//         required : true,
//      },
//      quantity : {
//         type : Number,
//         required : true,
//         default : 1,
//      },
//      size :{
//         type : String,
//      },
//      price : {
//         type : Number,
//         required : true,    
//      }
// });

// const CartSchema = new mongoose.Schema({
//     user : {
//         type : mongoose.Schema.Types.ObjectId,
//         ref : "user",
//         required : true,
//         unique: true,
//     },
//     items : [CartItemSchema],   
// },
// {
//     timestamps: true,
// });

// const Cart = mongoose.models.Cart ||mongoose.model("Cart", CartSchema);
// export default Cart;






import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
    },
  },
  { _id: false }
);

const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    items: {
      type: [CartItemSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Cart =
  mongoose.models.Cart || mongoose.model("Cart", CartSchema);

export default Cart;