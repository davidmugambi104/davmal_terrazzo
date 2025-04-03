import React, { useState } from 'react';

const ReviewAggregator = () => {
    const [reviews, setReviews] = useState([
        { id: 1, name: "John Doe", text: "Great product! Highly recommend." },
        { id: 2, name: "Jane Smith", text: "Good quality, but shipping was slow." }
    ]);
    const [name, setName] = useState('');
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && text) {
            const newReview = { id: reviews.length + 1, name, text };
            setReviews([...reviews, newReview]);
            setName('');
            setText('');
        }
    };

    return (
        <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h2 className="text-xl font-bold">Customer Reviews</h2>
            <ul className="space-y-2">
                {reviews.map((review) => (
                    <li key={review.id} className="border-b pb-2">
                        <p className="font-semibold">{review.name}</p>
                        <p className="text-gray-700">{review.text}</p>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit} className="space-y-3">
                <input 
                    type="text" 
                    placeholder="Your Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className="w-full p-2 border rounded"
                    required
                />
                <textarea 
                    placeholder="Write your review here..." 
                    value={text} 
                    onChange={(e) => setText(e.target.value)} 
                    className="w-full p-2 border rounded"
                    required
                />
                <button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                    Submit Review
                </button>
            </form>
        </div>
    );
};

export default ReviewAggregator;
