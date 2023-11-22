
import { Rubro } from '../types/Rubro';
const BASE_URL = 'http://localhost:8080';

export const RubroService = {
    getRubros: async (): Promise<Rubro[]> => {
        const response = await fetch(`${BASE_URL}/api/v1/rubroArticulos/getAll`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });
        const data = await response.json();
        return data;
    },

    getRubro: async (id: number): Promise<Rubro> => {
    const response = await fetch(`${BASE_URL}/api/v1/rubroArticulos/${id}`,{
             method: 'GET',
             headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type' : 'application/json'
            },
        });
        const data = await response.json();
        return data;
    },

    createRubro: async (rubro: Rubro): Promise<Rubro> => {
        const response = await fetch(`${BASE_URL}/api/v1/rubroArticulos`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rubro)
        });
        const data = await response.json();
        return data;
    },

    updateRubro: async (id: number, rubro: Rubro): Promise<Rubro> => {
        const response = await fetch(`${BASE_URL}/api/v1/rubroArticulos/${id}`, {
                    method: "PUT",
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(rubro)
                });
                const data = await response.json();
                return data;
            },

    deleteRubro: async (id: number): Promise<void> => {
                await fetch(`${BASE_URL}/api/v1/rubroArticulos/${id}`, {
                    method: "DELETE",
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                });
            }
           
    
};
