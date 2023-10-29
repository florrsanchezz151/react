
import { Products } from './../types/Products';
const BASE_URL = 'https://fakestoreapi.com';

export const ProductService = {
    getProducts: async (): Promise<Products[]> => {
        const response = await fetch(`${BASE_URL}/products`);
        const data = await response.json();
        return data;
    },

    getProduct: async (id: number): Promise<Products> => {
const response = await fetch(`${BASE_URL}/products/${id}`);
        const data = await response.json();
        return data;
    },

    createProduct: async (product: Products): Promise<Products> => {
        const response = await fetch(`${BASE_URL}/products`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
        const data = await response.json();
        return data;
    },

    updateProduct: async (id: number, product: Products): Promise<Products> => {
        const response = await fetch(`${BASE_URL}/products/${id}`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(product)
                });
                const data = await response.json();
                return data;
            },
            deleteProduct: async (id: number): Promise<void> => {
                await fetch(`${BASE_URL}/products/${id}`, {
                    method: "DELETE"
                });
            }
           
    
};
