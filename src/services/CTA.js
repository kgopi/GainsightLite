import {CTA_URL, getHeaders} from './ServiceController';

export function getCTADetails({ctaId, ctaTypeId, entity}){
    return fetch(CTA_URL + `/cta/fetch/details/${ctaId}?ctaTypeId=${ctaTypeId}&et=${entity}&etId=&layouts=false&associatedRecords=true&randprm=${Date.now()}`, {
            method: 'GET',
            headers: getHeaders()
        })
        .then(res => res.json())
        .catch(err => {
            console.error(err);
        });
}

export function fetchCTAs(){
    return fetch(CTA_URL + `/cta/fetch/view`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({
                "entityType":null,
                "entityId":null,
                "context":"COCKPIT",
                "showDrafts":false,
                "companyId":null,
                "relationshipId":null,
                "spId":null,
                "viewId":"1I003DC5CFEYS1J2GU9TXAOGK3TF8IBA1OCA"
            })
        })
        .then(res => res.json())
        .catch(err => {
            console.error(err);
        });
}

export function closeTask(taskId, isClosed){
    var url = CTA_URL + `/task/${isClosed ? 'close' : "reopen"}/${taskId}`;
    return fetch(url, {
        method: 'PUT',
        headers: getHeaders()
    })
    .then(res => res.json())
    .catch(err => {
        console.error(err);
    });
}

export function fetchTasks({ctaId, activityId}){
    var url = CTA_URL;
    if(activityId){
        url = url + `/task/byTimeline/${activityId}?ctaId=${ctaId}`;
    }else{
        url = url + `/task/byCta/${ctaId}?randprm=${Date.now()}`;
    }
    return fetch(url, {
            method: 'GET',
            headers: getHeaders()
        })
        .then(res => res.json())
        .catch(err => {
            console.error(err);
        });
}