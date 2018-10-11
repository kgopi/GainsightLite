import { CHANGE_APP_TITLE, ON_TAB_CHANGE } from './types';

export const changeAppTitle = title => {
  return {
    type: CHANGE_APP_TITLE,
    payload: title
  }
}

export const onChangeTab = selectedTab => {
  debugger;
  return {
    type: ON_TAB_CHANGE,
    payload: {selectedTab}
  }
}