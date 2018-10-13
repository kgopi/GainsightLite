import {getHeaders, GATEWAY_URL} from './ServiceController';
import store from './../Store';

function getSallyHeaders({tenantId, gsUserId, sallyAuthToken}){
    let currentState = store.getState();
    return {
        ...getHeaders(),
        tenantId,
        gsUserId,
        authToken: currentState.app.userToken,
        sallyAuthToken: sallyAuthToken
    }
}

export function getSallyToken({tenantId, userId}){
    let currentState = store.getState();
    let url = `https://dev-apigateway.develgs.com:9003/v1/sally/gschat/auth/obtain_token?gsUserId=${userId}&tenantId=${tenantId}`;
    return fetch(url,{method: 'GET',headers: {...getSallyHeaders({tenantId, gsUserId:userId}), authToken: currentState.app.userToken}})
        .then(res => res.json())
        .catch(err => {
            console.error(err);
        });
}

export function fetchSallyHistory({tenantId, userId, sallyAuthToken}){
    let url = `https://dev-apigateway.develgs.com:9003/v1/sally/gschat/history?tenantId=${tenantId}&user1=${userId}&user2=bot&size=10`;
    return fetch(url,{method: 'GET',headers: getSallyHeaders({tenantId, gsUserId: userId, sallyAuthToken})})
        .then(res => res.json())
        .catch(err => {
            console.error(err);
        });
}