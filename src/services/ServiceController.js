import store from '../Store';

export const GATEWAY_URL ="https://abstract-gong360.develgs.com";

export const TIMELINE_URL = GATEWAY_URL + "/v1/ant/timeline";

export const CTA_URL = GATEWAY_URL + "/v1/cockpit";

export function getHeaders(){

    let currentState = store.getState();
    let userToken = currentState && currentState.app && currentState.app.userToken;

    return {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        cookie: `sid=${userToken}`,
        version: 'v3',
        'x-gs-native': true
      }
}