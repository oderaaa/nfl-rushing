import { API } from '../config/api';
import { useState, useEffect } from 'react';
import { ERROR_STRING } from '../config/errorStrings';

const useGetRushingList = () => {
	const url = API.GET_RUSHING_LIST; 
    const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [data, setData] = useState();
    useEffect(() => {
        const fetchMyApi = async () => {
            try{
                const res = await fetch(url);
                if(!res.ok){
                    throw new Error(`${ERROR_STRING.STATUS_RESPONSE} ${res.status}`);  
                }
                const data = await res.json();
                setData(data);
                setLoading(false);
            }catch (err){
                setError(err.message);
                setLoading(false);
            }	
        };
        fetchMyApi();
	}, [url]);
    return {
        loading,
        error,
        data
    }    
}

export { useGetRushingList }


