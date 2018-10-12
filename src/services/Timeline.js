import {TIMELINE_URL, getHeaders, GATEWAY_URL} from './ServiceController';

export function fetchActivities({links, page, searchText="", query="", activities}){
    let url;
    if(!activities || !activities.length){
        url = TIMELINE_URL + `/search/activity/?to=4096788558000&t=${searchText}&page=0&size=20&q=${query}`;
    } else if(links.next && links.next.href){
        url = links.next.href;
    }

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

export function getAuthToken(){
    return fetch(GATEWAY_URL + `/v1/messenger/token`,{method: 'GET',headers: getHeaders()})
        .then(res => res.json())
        .catch(err => {
            console.error(err);
        });
}