import React from 'react';
import ReactDOM from 'react-dom';
import MiniCart from './cart/Cart';

document.addEventListener('DOMContentLoaded', function () {
    const reactRoot = document.getElementById('react-root');
    if (reactRoot) {
        ReactDOM.render(<MiniCart />, reactRoot);
    }
});
