import React, { useEffect, useState } from 'react';
import { addToCart, removeFromCart } from './cartApi';
import { loadCartFromLocalStorage, saveCartToLocalStorage } from './persistCart';

const MiniCart: React.FC = () => {
    const [cartItems, setCartItems] = useState<any[]>([]);

    // Load the cart data from localStorage or fetch it from Shopify
    const loadCart = async () => {
        try {
            const data = await loadCartFromLocalStorage();
            console.log('Loaded cart data:', data);
            setCartItems(data.items || []);
        } catch (error) {
            console.error('Error loading cart:', error);
        }
    };

    // Add a product to the cart
    const handleAddToCart = async (productId: string) => {
        try {
            const result = await addToCart(productId, 1);
            console.log('Product added to cart:', result);

            // Save updated cart to localStorage
            saveCartToLocalStorage(result);

            // Reload cart to reflect changes
            loadCart();
        } catch (error) {
            console.error('Failed to add product to cart:', error);
        }
    };

    // Remove an item from the cart
    const handleRemoveFromCart = async (lineItemId: number) => {
        try {
            const updatedCart = await removeFromCart(lineItemId);
            console.log('Product removed from cart:', updatedCart);

            // Save updated cart to localStorage
            saveCartToLocalStorage(updatedCart);

            // Reload cart to reflect changes
            loadCart();
        } catch (error) {
            console.error('Failed to remove product from cart:', error);
        }
    };

    useEffect(() => {
        loadCart();
    }, []);

    return (
        <div className="mini-cart">
            <h3>Mini Cart</h3>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.id}>
                            {item.title} - Quantity: {item.quantity}
                            <button
                                onClick={() => handleRemoveFromCart(item.id)} // Use `item.id` as `lineItemId`
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            <button
                onClick={() => handleAddToCart('PRODUCT_VARIANT_ID')} // Replace with a valid product variant ID
            >
                Add Example Product
            </button>
        </div>
    );
};

export default MiniCart;
