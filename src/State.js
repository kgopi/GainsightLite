export const initialState = {
    title: "Gainsight Lite",
    isDetailView: false,
    selectedTab: 0,
    timeline: {
      selectedActivity: null,
      isRefreshing: false,
      seed: 0,
      page: 0,
      activities: [],
      isLoading: false
    },
    cta: {
      selectedCta: null
    }
}