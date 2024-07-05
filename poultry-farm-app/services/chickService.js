import axios from "axios";
import {
    GET_ALL_INVENTORY_DETAILS_FOR_FARM_UI
} from '@env';

// Chick-Service api
const  CHICK_API_INVENTORY_ENDPOINT = GET_ALL_INVENTORY_DETAILS_FOR_FARM_UI

export const getAllInventoryDetails = async () => {
    try {
        const {data} = await axios.get(FARM_API_URL_FIRST_ENDPOINT);
        return data;
    } catch (err){
        console.error('Error message ::', err.message);
    }
};