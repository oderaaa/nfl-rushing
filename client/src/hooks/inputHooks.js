import { useState, useContext, useCallback } from 'react';
import { ListContext } from '../contexts/listContext';
import { getRequest } from '../services/networkingService';
import { API } from '../config/api';


const useToggle =  (defaultValue) => {
    const [toggleValue, setToggle] = useState(defaultValue);
    const [list, setList] = useContext(ListContext);
    
    const setToggleValue = async newValue => {
        const response = await handleToggleChange(newValue, list.query);
        const listCopy = {... list};
        listCopy.response = response.data.response;
        listCopy.query = response.newQuery;
        setList(listCopy);
        setToggle(newValue);
    }
    return {toggleValue, setToggleValue};   
}

const handleToggleChange = async (newValue, query) => {
    let re = /s=\w*&/; 
    let newQuery = query.replace(re, `s=${newValue}&`);
    const url = `${API.GET_RUSHING_LIST}${newQuery}`;
    const data = await getRequest(url);
    return {data, newQuery};     
}

const useFilter = () => {
    const [list, setList] = useContext(ListContext);
    const nameFilter = async value => {
        let re = /f=\w*&/;
        let newQuery = list.query.replace(re, `f=${value}&`);
        const url = `${API.GET_RUSHING_LIST}${newQuery}`;
        const data = await getRequest(url);     
        const listCopy = {... list};
        listCopy.response = data.response;
        listCopy.query = newQuery;    
        setList(listCopy);    
    }
    return nameFilter;
}

const useSelectDropDown = () => {
    const [list, setList] = useContext(ListContext);
    const setPageLimitValue  = async value => {
        let re = /l=\w*/;
        let newQuery = list.query.replace(re, `l=${value}`);
        const url = `${API.GET_RUSHING_LIST}${newQuery}`;
        console.log(url);
        const data = await getRequest(url);   
        const listCopy = {... list};
        listCopy.response = data.response;
        listCopy.query = newQuery;    
        setList(listCopy);       
    }
    return {setPageLimitValue};
}

export { useToggle, useFilter, useSelectDropDown };
