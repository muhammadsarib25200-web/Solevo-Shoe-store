import mongoose from "mongoose";
const orderItemSchema = new mongoose.Schema(
    {
        id:{
            type : Number,
            required : true,
        },
        name:{
            type:String,
            required: true,
        },
        image:{
            type:String,
            required:true,
        },
        price:{
            type:Number,
            required:true,  
        },
        quantity:{
            type:Number,
            required:true,  
            min:1,
    },
},
{_id:false}
);

const orderSchema = new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true,
        },
        customerName:{
            type:String,
            required:true,
        },
        customerEmail:{
            type:String,
            required:true,
        },
    //     shippingAddress:{
    //         fullName:{
    //             type:String,
    //             required:true,
    //         },
    //         address:{
    //             type:String,
    //             required:true,
    //         },
    //         city:{
    //             type:String,
    //             required:true,  
    //     },
    //     postalCode:{        
    //         type:String,
    //         required:true,
    //     },
    //     country:{
    //         type:String,
    //         required:true,      
    //   },
    //   phone:{
    //     type:String,
    //     required:true,  
    //   },
    // },
shippingAddress: {
    fullName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    postalCode: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
},
    
    items : [orderItemSchema],
    subtotal:{
        type:Number,
        required:true,
    },
    shippingFee:{
        type:Number,
        required:true,
    },
    total:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        default:'pending',
    }
},
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;