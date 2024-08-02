import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart";

// Definindo o tipo do estado da aplicação
export type RootState = ReturnType<typeof store.getState>;

// Criando a store com os reducers
export const store = configureStore({
    reducer: {
        cart: cartReducer,
        // outros reducers...
    },
});

// Inferindo os tipos de AppDispatch a partir da store
export type AppDispatch = typeof store.dispatch;
