import {TIMELINE_URL, getHeaders, GATEWAY_URL} from './ServiceController';

export function fetchActivities({links, page, query=""}){
    let url;
    if(page.number == 0){
        url = TIMELINE_URL + `/search/activity/?to=4096788558000&page=0&size=20&q=${query}`;
    }else if(links.next != null){
        url = links.next;
    }
    return fetch(url,{method: 'GET',headers: getHeaders()})
        .then(res => res.json())
        .catch(err => {
            console.error(err);
        });
}

export function getAuthToken(){
    return fetch(GATEWAY_URL + `/v1/messenger/token`,{method: 'GET',headers: getHeaders()})
        .then(res => res.json())
        .catch(err => {
            console.error(err);
        });
}