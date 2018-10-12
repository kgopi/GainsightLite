import { 
  ADD_ACTIVITY, ON_TAB_CHANGE, LOAD_ACTIVITIES, HANDLE_REFRESH, HANDLE_LOAD_MORE, SHOW_DETAIL_VIEW,
  GO_HOME, UPDATE_TIMELINE_DATA, ON_SEARCH
} from '../actions/types';
import {initialState} from '../State';

export const GainsightLiteReducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
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
    case ON_SEARCH:
      newState = {...state, searchText: action.payload};
      newState.timeline = {...newState.timeline, selectedActivity: null, links: {next: null}, page: {number: 0}};
      return newState;
    default:
      return state;
  }
}