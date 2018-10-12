import { HANDLE_LOAD_MORE, HANDLE_REFRESH, SHOW_CTA_DETAIL_VIEW, LOAD_CTAS, SHOW_DETAIL_VIEW, GO_HOME, UPDATE_CTA_DATA } from './types';

export const loadCtas = (ctas, isRefreshing) => {
  return {
    type: LOAD_CTAS,
    payload: {
      cta: {
        isRefreshing,
        ctas
      }
    }
  }
}

export const updateCTAState = (data) => {
  return {
    type: UPDATE_CTA_DATA,
    payload: data
  }
}

export const showDetailView = (item, title) => {
  return {
    type: SHOW_CTA_DETAIL_VIEW,
    payload: {
      title,
      isDetailView: true,
      cta: {
        selectedCta: item
      }
    }
  }
}