import React, { useState, useEffect } from 'react';
import MiniCart from './components/MiniCart';

const SHOPIFY_STORE_DOMAIN = 'noodeco.myshopify.com';
const ACCESS_TOKEN = 'ef6e69d0ee94ee52d3ba1d97f9a40b3a';

const App = () => {
    // State for cart items
    const [cartItems, setCartItems] = useState([]);
    const [checkoutId, setCheckoutId] = useState(null);

    // Fetch cart function
    const fetchCart = async () => {
        if (!checkoutId) {
            console.error('Checkout ID is not available');
            return;
        }

        try {
            const response = await fetch(`https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`, {
                method: 'POST',
                headers: {
                    'X-Shopify-Storefront-Access-Token': ACCESS_TOKEN,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                    {
                        checkout(id: "${checkoutId}") {
                            lineItems(first: 10) {
                                edges {
                                    node {
                                        id
                                        title
                                        quantity
                                        variant {
                                            id
                                            priceV2 {
                                                amount
                                                currencyCode
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                `,
                }),
            });

            const data = await response.json();
            if (data.errors) {
                console.error('Failed to fetch cart', data.errors);
            } else {
                setCartItems(data.data.checkout.lineItems.edges || []);
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };


    const createCheckout = async () => {
        try {
            const response = await fetch(`https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`, {
                method: 'POST',
                headers: {
                    'X-Shopify-Storefront-Access-Token': ACCESS_TOKEN,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                    mutation {
                        checkoutCreate(input: {}) {
                            checkout {
                                id
                            }
                            userErrors {
                                field
                                message
                            }
                        }
                    }
                `,
                }),
            });

            const data = await response.json();
            if (data.errors || data.data.checkoutCreate.userErrors.length > 0) {
                console.error('Failed to create checkout:', data.errors || data.data.checkoutCreate.userErrors);
                return null;
            }
            const newCheckoutId = data.data.checkoutCreate.checkout.id;
            console.log('Checkout ID:', newCheckoutId);
            setCheckoutId(newCheckoutId); // Save the checkout ID to state
            return newCheckoutId;
        } catch (error) {
            console.error('Error creating checkout:', error);
            return null;
        }
    };

    useEffect(() => {
        fetchCart(); // Fetch cart whenever checkoutId changes
    }, [checkoutId]); // Added checkoutId to dependency array

    const handleCheckoutClick = async () => {
        const newCheckoutId = await createCheckout();
        if (newCheckoutId) {
            console.log('Redirecting to checkout with ID:', newCheckoutId);
            // Redirect logic or further handling
        }
    };

    return (
        <div>
            <h1>Product Catalog</h1>
            <MiniCart cartItems={cartItems} removeFromCart={() => { }} handleCheckoutClick={handleCheckoutClick} />
        </div>
    );
};

export default App;
