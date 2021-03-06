import {
    ADD_ACTIVITY,
    ON_TAB_CHANGE,
    LOAD_ACTIVITIES,
    HANDLE_REFRESH,
    HANDLE_LOAD_MORE,
    SHOW_DETAIL_VIEW,
    GO_HOME,
    UPDATE_TIMELINE_DATA,
    ON_SEARCH,
    SHOW_CTA_DETAIL_VIEW,
    UPDATE_CTA_DATA,
    LOAD_CTAS,
    USER_SIGNED_IN,
    USER_SIGNIN_PROGRESS, USER_INFO_LOADED,
    UPDATE_SALLY, USER_SIGNOUT_PROGRESS, USER_SIGNED_OUT
} from '../actions/types';
import {initialState} from '../State';

export const GainsightLiteReducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case USER_SIGNED_IN:
      newState = {...state};
      newState.userToken = action.payload.userToken;
      return newState;
    case USER_SIGNIN_PROGRESS:
      newState = {...state};
      newState.signin = {...newState.signin, ...action.payload};
      return newState;
    case USER_SIGNOUT_PROGRESS:
        newState = {...state};
        newState.signout = {...newState.signout, ...action.payload};
        return newState;
    case USER_SIGNED_OUT:
      newState = {...state};
      newState.userToken = null;
      return newState;
    case USER_INFO_LOADED:
      newState = {...state};
      newState.GS = {...newState.GS, ...action.payload};
      return newState;
    case HANDLE_REFRESH:
      newState = {...state};
      newState.timeline = {...newState.timeline, ...action.payload.timeline}
      return newState;
    case HANDLE_LOAD_MORE:
      newState = {...state};
      newState.timeline = {...newState.timeline, ...action.payload.timeline}
      return newState;
    case LOAD_ACTIVITIES:
      newState = {...state};
      newState.timeline = {...newState.timeline, ...action.payload.timeline}
      return newState;
    case SHOW_DETAIL_VIEW:
      newState = {...state, title: action.payload.title, isDetailView: action.payload.isDetailView};
      newState.timeline = {...newState.timeline, ...action.payload.timeline}
      return newState;
    case SHOW_CTA_DETAIL_VIEW:
      newState = {...state, title: action.payload.title, isDetailView: action.payload.isDetailView};
      newState.timeline = {...newState.timeline, ...action.payload.timeline}
      return newState;
    case GO_HOME:
      newState = {...state, isDetailView: false};
      newState.timeline = {...newState.timeline, selectedActivity: null}
      return newState;
    case ON_TAB_CHANGE:
      newState = {...state, selectedTab: action.payload.selectedTab};
      return newState;
    case UPDATE_TIMELINE_DATA:
      newState = {...state};
      newState.timeline = {...newState.timeline, ...action.payload}
      return newState;
    case UPDATE_CTA_DATA:
      newState = {...state};
      newState.cta = {...newState.cta, ...action.payload}
      return newState;
    case ON_SEARCH:
      newState = {...state, searchText: action.payload};
      newState.timeline = {...newState.timeline, selectedActivity: null, links: {next: null}, page: {number: 0}};
      return newState;
    case LOAD_CTAS:
      newState = {...state};
      newState.cta = {...newState.cta, ...action.payload.cta}
      return newState;
    case UPDATE_SALLY:
      newState = {...state};
      newState.sally = {...newState.sally, ...action.payload}
      return newState;
    default:
      return state;
  }
}