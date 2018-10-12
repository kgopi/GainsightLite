import { CHANGE_APP_TITLE, ON_TAB_CHANGE, ON_SEARCH, USER_SIGNED_IN} from './types';

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
     payload: userToken
  }
};