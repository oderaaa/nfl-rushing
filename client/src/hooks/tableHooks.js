import { useState, useContext } from 'react';
import { ListContext } from '../contexts/listContext';
import { getRequest } from '../services/networkingService';
import { API } from '../config/api';

const useGoToNextPage = () => {
    const [list, setList] = useContext(ListContext);
    const goToNextPage = async () => {
        if(list.response.next){
            let re = /p=\w*&/;
            let query = list.query;
            let newQuery = query.replace(re, `p=${list.response.next.page}&`);
            const url = `${API.GET_RUSHING_LIST}${newQuery}`;
            const data = await getRequest(url);
            const listCopy = {...list};
            listCopy.response = data.response;
            listCopy.query = newQuery;
            setList(listCopy);      
        }      
    }

    return  goToNextPage; 
}

const useGoToPrevPage = () => {
    const [list, setList] = useContext(ListContext);
    const goToPrevPage = async () => {
        if(list.response.previous){
            let re = /p=\w*&/;
            let query = list.query;
            console.log(list);
            let newQuery = query.replace(re, `p=${list.response.previous.page}&`);
            const url = `${API.GET_RUSHING_LIST}${newQuery}`;
            const data = await getRequest(url);
            const listCopy = {...list};
            listCopy.response = data.response;
            listCopy.query = newQuery;
            setList(listCopy);   
        }         
    }

    return goToPrevPage;    
}

export {  useGoToNextPage, useGoToPrevPage };
