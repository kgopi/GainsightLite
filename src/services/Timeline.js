import {TIMELINE_URL, getHeaders, GATEWAY_URL} from './ServiceController';

export function fetchActivities({searchText="", query=""}){
    let url = TIMELINE_URL + `/search/activity/?to=4096788558000&t=${searchText}&page=0&size=20&q=${query}`;
    return fetch(url,{method: 'GET',headers: getHeaders()})
        .then(res => res.json()).then((res)=>{
            if(res && res.data && res.data.links){
                let lmp = {};
                res.data.links.forEach((link)=>{
                    lmp[link.rel] = link;
                });
                res.data.links = lmp;
            }
            return res;
        })
        .catch(err => {
            console.error(err);
        });
}

export function fetchNextActivities(nextUrl){
    return fetch(nextUrl,{method: 'GET',headers: getHeaders()})
        .then(res => res.json()).then((res)=>{
            if(res && res.data && res.data.links){
                let lmp = {};
                res.data.links.forEach((link)=>{
                    lmp[link.rel] = link;
                });
                res.data.links = lmp;
            }
            return res;
        })
        .catch(err => {
            console.error(err);
        });
}

export function getAuthToken(){
    return fetch(GATEWAY_URL + `/v1/messenger/token?mobile`,{method: 'GET',headers: getHeaders()})
        .then(res => res.json())
        .catch(err => {
            console.error(err);
        });
}