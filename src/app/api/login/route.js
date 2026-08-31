import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export async function POST(request) {

    try {
        await connectDB();
        const { email, password } = await request.json();
        if (!email || !password) {
            return NextResponse.json(
                { error: 'email and passord are required' },
                { status: 400 }
            );
        }

        const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
        if (!user) {
            return NextResponse.json(
                { error: 'invalid email or passowrd' },
                { status: 401 }
            );
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json(
                { error: 'invalid email or password' },
                { status: 401 }
            );
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        return NextResponse.json(
            {
                message: 'Login Successful',
                token,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email
                },
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: 'something went wrong', details: error.message },
            { status: 400 }
        )
    }
}