import { connectionStr } from "@/lib/connectDB";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Products from "@/Model/product"

export async function GET(params) {
    
    await mongoose.connect(connectionStr);
    const data = await Products.find();

    return NextResponse.json({result:data})
}