import { connectionStr } from "@/lib/connectDB";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Products from "@/Model/product";

export async function handler(req) {
    try {
        await mongoose.connect(connectionStr);

        // Handle different HTTP methods
        switch (req.method) {
            case 'GET':
                const data = await Products.find();
                return NextResponse.json({ result: data });

            case 'POST':
                try {
                    
                const body = await req.json(); // Parse JSON body
                const newProduct = new Products(body);
                const savedProduct = await newProduct.save();
                return NextResponse.json({ result: savedProduct, message: 'Product created successfully!' });

                    
                } catch (error) {
                    console.log("Error",error)
                }


                case 'PUT':
                const bodyForPut = await req.json(); // Parse JSON body for PUT
                const { id, email, password } = bodyForPut;

                // Ensure ID is provided to update
                if (!id) {
                    return NextResponse.json(
                        { error: 'ID is required to update the product.' },
                        { status: 400 }
                    );
                }

                // Update the product by ID
                const updatedProduct = await Products.findByIdAndUpdate(
                    id,
                    { email, password },
                    { new: true, runValidators: true }
                );

                if (!updatedProduct) {
                    return NextResponse.json(
                        { error: 'No product found with the given ID.' },
                        { status: 404 }
                    );
                }

                return NextResponse.json({
                    result: updatedProduct,
                    message: 'Product updated successfully!',
                });

                //DELETE API 
                case 'DELETE':
                    const bodyForDelete = await req.json(); // Parse JSON body for DELETE request
                    const { ID } = bodyForDelete;
                
                    // Ensure ID is provided to delete
                    if (!ID) {
                        return NextResponse.json(
                            { error: 'ID is required to delete the product.' },
                            { status: 400 }
                        );
                    }
                
                    // Delete the product by ID
                    const deletedProduct = await Products.findByIdAndDelete(ID); // Use findByIdAndDelete
                
                    if (!deletedProduct) {
                        return NextResponse.json(
                            { error: 'No product found with the given ID.' },
                            { status: 404 }
                        );
                    }
                
                    return NextResponse.json({
                        result: deletedProduct,
                        message: 'Product deleted successfully!',
                    });
                
            default:
                return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export { handler as GET, handler as POST, handler as PUT,handler as DELETE };