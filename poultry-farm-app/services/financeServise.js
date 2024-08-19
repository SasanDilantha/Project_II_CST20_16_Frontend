import axios from 'axios';
import {
    GET_ALL_INCOME,
    GET_ALL_EXPENSES,
    GET_ALL_FINANCE
} from '@env';


export const  getAllIncomeList = async () => {
    try {
        const {data} = await axios.get(GET_ALL_INCOME);
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

export const  getAllExpensesList = async () => {
    try {
        const {data} = await axios.get(GET_ALL_EXPENSES);
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

export const  getAllFinanceList = async () => {
    try {
        const {data} = await axios.get(GET_ALL_FINANCE);
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

