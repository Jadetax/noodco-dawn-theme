import React, { useState, useEffect } from 'react';
import { useShopifyCart } from '@shopify/hydrogen';

const MiniCart = () => {
    const { lineItems, addLineItem, removeLineItem, cartError } = useShopifyCart();

    useEffect(() => {
        if (cartError) {
            alert('An error occurred while updating the cart.');
        }
    }, [cartError]);

    const handleRemoveFromCart = async (variantId) => {
        try {
            await removeLineItem(variantId);
            alert('Item removed from cart');
        } catch (error) {
            alert('Failed to remove item from cart');
        }
    };

    return (
        <div className="mini-cart">
            <h2>Mini Cart</h2>
            {lineItems.length === 0 ? (
                <p>No items in cart</p>
            ) : (
                <ul>
                    {lineItems.map((item) => (
                        <li key={item.id}>
                            {item.title} - {item.quantity} x {item.variant.price}
                            <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MiniCart;
