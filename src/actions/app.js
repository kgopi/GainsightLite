import {
    CHANGE_APP_TITLE,
    ON_TAB_CHANGE,
    ON_SEARCH,
    USER_SIGNED_IN,
    USER_SIGNIN_PROGRESS,
    USER_INFO_LOADED
} from './types';

export const changeAppTitle = title => {
  return {
    type: CHANGE_APP_TITLE,
    payload: title
  }
}

export const onChangeTab = selectedTab => {
  return {
    type: ON_TAB_CHANGE,
    payload: {selectedTab}
  }
}

export const onSearch = text => {
  return {
    type: ON_SEARCH,
    payload: text
  }
}

export const onSignedIn = userToken =>{
  return {
     type: USER_SIGNED_IN,
     payload: {
       userToken
     }
  }
};

export const onSignedInprogress = showLoader =>{
    return {
        type: USER_SIGNIN_PROGRESS,
        payload: {
            showLoader
        }
    }
};

export const onUserInfoLoaded = payload => {
    return {
        type: USER_INFO_LOADED,
        payload
    }
};