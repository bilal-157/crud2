'use client';

import { useState } from 'react';

export default function InputForm() {
    const [id, setId] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form refresh
    
        try {
            const response = await fetch('http://localhost:3000/api/products', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ID: id }), // Ensure this matches the API
            });
    
            // Check if the response is OK (status 200-299)
            if (response.ok) {
                const data = await response.json(); // Parse the JSON response
                setMessage('Data deleted successfully!');
                // Clear the input field
                setId('');
            } else {
                // If response is not OK, handle the error
                const error = await response.text(); // Use .text() if response is not JSON
                setMessage(`Error: ${error}`);
            }
        } catch (error) {
            console.error('Error submitting data:', error);
            setMessage('Something went wrong!');
        }
    };
    
    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Delete Product</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Product ID:</label>
                    <input
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md"
                        placeholder="Enter the Product ID"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                >
                    Delete
                </button>
            </form>
            {message && <p className="mt-4 text-green-600">{message}</p>}
        </div>
    );
}
