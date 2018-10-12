import {GS_BOOTSTRAP, getHeaders} from "./ServiceController";

export function fetchBootstrap(){
    return fetch(GS_BOOTSTRAP, {
        method: 'GET',
        headers: getHeaders()
    }).then(res => res.json())
    .catch(err => {
        console.error(err);
    });
}