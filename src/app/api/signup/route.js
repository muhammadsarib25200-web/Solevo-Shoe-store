import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/user";
export async function POST(request){
    try{
        await connectDB();       
        const{name,email,password} = await request.json();
        if(!name || !email || !password){
            return NextResponse.json(
                {error : 'All field are required'},
                {status: 404}
            );
        }

        const exisingUser = await User.findOne({email} )
        if(exisingUser){
            return NextResponse.json(
                {error : 'User already exist with this email'},
                {status : 409}
            );}

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password : hashedPassword,
        });
        return NextResponse.json({
            message : 'user create successfully',
            user: {
                id:newUser.id,
                name: newUser.name,
                email:newUser.email,
            },
         },
         {status: 201}
        );

    }catch(error){
      return NextResponse.json(
        {error:'something went wrong', details: error.message},
        {status:500}
      );
    }

}


