import {getHeaders, GATEWAY_URL} from './ServiceController';

export function doLogout() {
    return fetch(GATEWAY_URL + `/logout`,{method: 'GET',headers: getHeaders()})
        .catch(err => {
            console.error(err);
        });
}