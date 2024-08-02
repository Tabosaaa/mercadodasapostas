import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { products } from '../services/Products'; // Importe seus produtos

// Definindo a interface para o item do carrinho
export interface CartItem {
    productId: number;
    quantity: number;
}

// Definindo a interface para o estado do carrinho
export interface CartState {
    items: CartItem[];
}

// Estado inicial do carrinho
const initialState: CartState = {
    items: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') || '') : [],
};

// Criando o slice de carrinho
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<{ productId: number; quantity: number }>) => {
            const { productId, quantity } = action.payload;
            const existingItem = state.items.find(item => item.productId === productId);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.items.push({ productId, quantity });
            }
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        changeQuantity: (state, action: PayloadAction<{ productId: number; quantity: number }>) => {
            const { productId, quantity } = action.payload;
            const existingItem = state.items.find(item => item.productId === productId);
            if (quantity <= 0) {
                state.items = state.items.filter(item => item.productId !== productId);
            }
            if (existingItem) {
                existingItem.quantity = quantity;
            }
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        removeItem: (state, action: PayloadAction<{ productId: number }>) => {
            const { productId } = action.payload;
            state.items = state.items.filter(item => item.productId !== productId);
            localStorage.setItem('cart', JSON.stringify(state.items));      
        }
    },
});

// Função separada para calcular o custo total do carrinho
export const cartTotalCost = (items: CartItem[]) => {
    return items.reduce((total, item) => {
        const product = products.find(p => p.id === item.productId);
        const productPrice = product ? parseFloat(product.price.replace('$', '')) : 0;
        return total + (productPrice * item.quantity);
    }, 0);
};

// Exportando as ações e o reducer
export const { addToCart, changeQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
