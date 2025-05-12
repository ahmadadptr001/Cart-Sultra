import axios from 'axios';

export const getAll = async () => {
        const endpoint = import.meta.env.VITE_ALL_PRODUCTS_URL;
        const response = await axios.get(endpoint);
        return response.data
}

export const getByCategorySlug = async (CategorySlug) => {
        const endpoint = import.meta.env.VITE_PRODUCTS_BY_SLUG + CategorySlug;
        const response = await axios.get(endpoint);
        return response.data
}

export const getByIdProduct = async (idProduct)=> {
        const endpoint = import.meta.env.VITE_PRODUCTS_BY_ID + idProduct
        const response = await axios.get(endpoint);
        return response.data;
}
