import {TIMELINE_URL, getHeaders} from './ServiceController';

export async function fetchActivities({links, page, query=""}){
    try {
        let url;
        if(page.number == 0){
            url = TIMELINE_URL + `/search/activity/?to=4096788558000&page=0&size=20&q=${query}`;
        }else if(links.next != null){
            url = links.next;
        }
        return fetch(url,{method: 'GET',headers: getHeaders()})
            .then(res => res.json()).catch(err => {
                console.error(err);
            });
    } catch (error) {
      console.error(error);
    }
}