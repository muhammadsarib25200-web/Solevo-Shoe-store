import {Resend} from "resend";
import connectDB from "@/lib/mongodb";
import Order from "@/models/order";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(request){
    try{
        await connectDB();
        const body = await request.json();
        const {
            userId,
            customerName,
            customerEmail,
            shippingAddress,
            items,
            subtotal,   
            shippingFee,
            total,
        } = body;

        if(
            !userId ||
            !customerName ||
            !customerEmail ||
            !shippingAddress || 
            !items ||
            items.length === 0
        ){
            return NextResponse.json(
                {
                    success:false,
                    message:"Required order data is misssing",
                },
                {status:400}
            );
        }

        const order = await Order.create({
            user: userId,
            customerName,
            customerEmail,
            shippingAddress,    
            items,
            subtotal,
            shippingFee,
            total,
        });

        await resend.emails.send({

            from:"onboarding@resend.dev",
            to:process.env.OWNER_EMAIL,
            subject:`New Order from ${customerName}`,
            html:`
            <h2>New Order Received</h2>

        <h3>Customer</h3>
        <p>Name: ${customerName}</p>
        <p>Email: ${customerEmail}</p>

        <h3>Shipping Address</h3>
        <p>${shippingAddress.fullName}</p>
        <p>${shippingAddress.address}</p>
        <p>${shippingAddress.city}</p>
        <p>${shippingAddress.postalCode}</p>
        <p>${shippingAddress.country}</p>
        <p>Phone: ${shippingAddress.phone}</p>

        <h3>Ordered Items</h3>
         ${items
         .map(
          (item) => `
             <p>
                ${item.name} × ${item.quantity}
                — ${item.price}
              </p>`    
         )
         .join("")}
          <h3>Bill</h3>
        <p>Subtotal: ${subtotal}</p>
        <p>Shipping: ${shippingFee}</p>
        <h2>Total: ${total}</h2>
         `,
        });

        return NextResponse.json({
            success: true,
            message:"order placed successfully",
            order,
        });
    }catch(error){
    console.error("order API Error", error);

    return NextResponse.json(
        {
            success:false,
            message:error.message,
        },
        {status : 500}
    );
    }
}