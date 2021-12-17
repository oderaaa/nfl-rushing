import { ERROR_STRING } from '../config/errorStrings';

export async function getRequest (url) {
    const res = await fetch(url);
    if(!res.ok){
        throw new Error(`${ERROR_STRING.STATUS_RESPONSE} ${res.status}`);  
    }
    const data = await res.json();
    return data;
}
