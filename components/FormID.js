'use client';

import { useState } from 'react';

export default function InputForm() {
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form refresh
    
        try {
            const response = await fetch('http://localhost:3000/api/products', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, email, password }),
            });
    
            // Check if the response is OK (status 200-299)
            if (response.ok) {
                const data = await response.json(); // Parse the JSON response
                setMessage('Data submitted successfully!');
                // Clear the input fields
                setId('');
                setEmail('');
                setPassword('');
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
            <h1 className="text-2xl font-bold mb-4">Submit Your Credentials</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">ID:</label>
                    <input
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md"
                        placeholder="Enter the ID"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md"
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md"
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    Submit
                </button>
            </form>
            {message && <p className="mt-4 text-green-600">{message}</p>}
        </div>
    );
}
