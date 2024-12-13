import React from 'react';

const Product = ({ product, addToCart }) => {
    const handleAddToCart = () => {
        addToCart(product.id); // Calls the addToCart method with product ID
    };

    return (
        <div className="product-card">
            <img src={`/assets/images/products/${product.id}.jpg`} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.price}</p>
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
    );
};

export default Product;
