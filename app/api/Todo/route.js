import { NextResponse } from "next/server";
import { connectionStr } from "@/lib/connectDB"; // Changed to named import
import Todo from "@/Model/Todo";
import mongoose from "mongoose";

export async function GET() {
    try {
        if (!connectionStr) {
            throw new Error("Database connection string is undefined");
        }
        await mongoose.connect(connectionStr);
        const todos = await Todo.find();
        console.log(todos);
        return NextResponse.json(todos);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        if (!connectionStr) {
            throw new Error("Database connection string is undefined");
        }
        await mongoose.connect(connectionStr);
        
        const data = await request.json();
        const newTodo = await Todo.create(data);
        
        return NextResponse.json(newTodo);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        if (!connectionStr) {
            throw new Error("Database connection string is undefined");
        }
        await mongoose.connect(connectionStr);
        
        const data = await request.json();
        const todoId = params.id;
        
        const updatedTodo = await Todo.findByIdAndUpdate(
            todoId,
            { completed: data.completed },
            { new: true }
        );
        
        if (!updatedTodo) {
            return NextResponse.json({ error: "Todo not found" }, { status: 404 });
        }
        
        return NextResponse.json(updatedTodo);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}