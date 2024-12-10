export const addToCart = async (productId: string, quantity: number) => {
    try {
        const response = await fetch('/cart/add.js', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: productId, quantity }),
        });

        if (!response.ok) {
            throw new Error('Failed to add product to cart');
        }

        return await response.json();
    } catch (error) {
        console.error('Error during addToCart:', error);
        throw error;
    }
};

export const removeFromCart = async (lineItemId: number) => {
    try {
        const response = await fetch('/cart/change.js', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ updates: [{ id: lineItemId, quantity: 0 }] }),
        });

        if (!response.ok) {
            throw new Error('Failed to remove product from cart');
        }

        return await response.json();
    } catch (error) {
        console.error('Error during removeFromCart:', error);
        throw error;
    }
};

export const fetchCart = async () => {
    try {
        const response = await fetch('/cart.js');
        if (!response.ok) {
            throw new Error('Failed to fetch cart');
        }

        return await response.json();
    } catch (error) {
        console.error('Error during fetchCart:', error);
        throw error;
    }
};
