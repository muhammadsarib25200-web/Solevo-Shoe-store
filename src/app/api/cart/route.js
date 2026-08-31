

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Cart from "@/models/cart";

export async function POST(request) {
    try {
        await connectDB();

        const body = await request.json();

        const { userId, items } = body;

        // Check required data
        if (!userId || !items || items.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User ID and cart items are required",
                },
                { status: 400 }
            );
        }

        // Check if user already has a cart
        const existingCart = await Cart.findOne({
            user: userId,
        });

        // If cart already exists, update it
        if (existingCart) {
            existingCart.items = items;

            await existingCart.save();

            return NextResponse.json({
                success: true,
                message: "Cart updated successfully",
                cart: existingCart,
            });
        }

        // If cart doesn't exist, create new cart
        const newCart = await Cart.create({
            user: userId,
            items: items,
        });

        return NextResponse.json({
            success: true,
            message: "Cart saved successfully",
            cart: newCart,
        });

    } catch (error) {
        console.log("Cart API Error:", error);

        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            { status: 500 }
        );
    }
}