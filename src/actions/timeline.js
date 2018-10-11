import { HANDLE_LOAD_MORE, HANDLE_REFRESH, LOAD_ACTIVITIES, SHOW_DETAIL_VIEW, GO_HOME, UPDATE_TIMELINE_DATA } from './types';

export const handleRefresh = (seed) => {
  return {
    type: HANDLE_REFRESH,
    payload: {
      timeline: {
        seed: seed,
        isRefreshing: true
      }
    }
  }
};

export const handleLoadMore = (page) => {
  return {
    type: HANDLE_LOAD_MORE,
    payload: {
      timeline: {
        page: page
      }
    }
  }
};

export const loadActivities = (activities, isRefreshing) => {
  return {
    type: LOAD_ACTIVITIES,
    payload: {
      timeline: {
        isRefreshing,
        activities
      }
    }
  }
}

export const updateTimelineState = (data) => {
  return {
    type: UPDATE_TIMELINE_DATA,
    payload: data
  }
}

export const showDetailView = (item, title) => {
  return {
    type: SHOW_DETAIL_VIEW,
    payload: {
      title,
      isDetailView: true,
      timeline: {
        selectedActivity: item
      }
    }
  }
}

export const goToHome = () => {
  return {
    type: GO_HOME
  }
}