import React from 'react';

const categories = [
    "Electronics",
    "Sports",
    "Home",
    "Fashion",
];

const ProductFilters = ({ price, setPrice, category, setCategory, ratings, setRatings }) => {
    return (
        <div>
            <div>
                <h3>Price</h3>
                <input
                    type="range"
                    min="0"
                    max="25000"
                    value={price[1]}
                    onChange={(e) => setPrice([0, Number(e.target.value)])}
                />
                <span>Max Price: ₹{price[1]}</span>
            </div>

            <div>
                <h3>Categories</h3>
                <ul>
                    {categories.map((cat) => (
                        <li
                            key={cat}
                            style={{ cursor: "pointer", fontWeight: category === cat ? "bold" : "normal" }}
                            onClick={() => setCategory(cat)}
                        >
                            {cat}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3>Ratings Above</h3>
                <input
                    type="range"
                    min="0"
                    max="5"
                    value={ratings}
                    onChange={(e) => setRatings(Number(e.target.value))}
                />
                <span>{ratings} Stars</span>
            </div>
        </div>
    );
};

export default ProductFilters;
