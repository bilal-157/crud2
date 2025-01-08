"use client"
// components/ProductList.js
import React, { useEffect, useState } from 'react';

const ProductList = () => {
    const [products, setProducts] = useState([]);  // Store products
    const [loading, setLoading] = useState(true);   // Store loading state
    const [error, setError] = useState(null);       // Store error if there's any

    // Fetch data when the component mounts
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/products');  // Replace with your API URL
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setProducts(data.result);  // Assume the API returns an object with a 'products' array
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []); // Empty dependency array ensures the effect runs once after the initial render

    // Render loading, error, or product list
    if (loading) {
        return <p className='text-4xl pt-5 text-center text-red-400'>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h1 className='text-4xl mt-5 text-blue-500 text-center'>Product List</h1>
            <ul className='bg-blue-300 text-black p-1 mb-5 text-center'>
                {products.map((product, i) => (
                    <li key={i}>


                        <h3 className='text-2xl text-blue-800'>({i}) </h3>

                        <h3>{product.email} </h3>
                        
                        <p>{product._id}</p>

                        <p>{product.password}</p>
                        <br /><hr />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
