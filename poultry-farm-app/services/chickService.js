import axios from "axios";
import {
    GET_ALL_INVENTORY_DETAILS_FOR_FARM_UI,
    GET_GET_ALL_SUPPLIER,
} from '@env';


export const getAllInventoryDetails = async () => {
    try {
        const {data} = await axios.get(GET_ALL_INVENTORY_DETAILS_FOR_FARM_UI);
        return data;
    }catch(err){
        if (err.response){
            console.error('Error getting from response ::', err.response.data);
        }else if(err.request){
            console.error('Error getting from request ::', err.request);
        }else {
            console.error('Error message ::', err.message);
        }
        console.error('Error Config ::', err.config);
    }
};
export const getAllSupplierDetails = async () => {
    try {
        const {data} = await axios.get(GET_GET_ALL_SUPPLIER);
        return data;
    }catch(err){
        if (err.response){
            console.error('Error getting from response ::', err.response.data);
        }else if(err.request){
            console.error('Error getting from request ::', err.request);
        }else {
            console.error('Error message ::', err.message);
        }
        console.error('Error Config ::', err.config);
    }
};