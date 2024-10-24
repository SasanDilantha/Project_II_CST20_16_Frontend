import axios from 'axios';
import {
    GET_ALL_FARM_DETAILS_FOR_FIRST_UI
} from '@env';

// Farm-Service api
const FARM_API_URL_FIRST_ENDPOINT = GET_ALL_FARM_DETAILS_FOR_FIRST_UI;

export const  getAllFarmDetails = async () => {
    try {
        const {data} = await axios.get(FARM_API_URL_FIRST_ENDPOINT);
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

