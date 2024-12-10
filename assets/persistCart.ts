import { fetchCart } from './cartApi';

// Save the cart state into localStorage
export const saveCartToLocalStorage = (cart: any) => {
    console.log('Saving Cart to LocalStorage:', cart);
    localStorage.setItem('miniCart', JSON.stringify(cart));
};

// Load the cart from localStorage, if available, or fetch it from Shopify
export const loadCartFromLocalStorage = async () => {
    const savedCart = localStorage.getItem('miniCart');

    if (savedCart) {
        console.log('Loaded Cart from LocalStorage:', JSON.parse(savedCart));
        return JSON.parse(savedCart);
    }

    try {
        const fetchedCart = await fetchCart();
        console.log('Fetched Cart from Shopify:', fetchedCart);
        saveCartToLocalStorage(fetchedCart);
        return fetchedCart;
    } catch (error) {
        console.error('Error loading cart from Shopify', error);
        return {};
    }
};
