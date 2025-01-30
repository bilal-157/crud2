import { NextResponse } from "next/server";
import { connectionStr } from "@/lib/connectDB";
import Todo from "@/Model/Todo";
import mongoose from "mongoose";

export async function DELETE(request, context) {
    try {
        // Check if the connection is already established
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(connectionStr);
        }

        const id = context.params.id;

        // Check if the ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid Todo ID" }, { status: 400 });
        }

        const deletedTodo = await Todo.findByIdAndDelete(id);
        
        if (!deletedTodo) {
            return NextResponse.json({ error: "Todo not found" }, { status: 404 });
        }
        
        return NextResponse.json({ message: "Todo deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Delete error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}