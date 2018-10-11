export const initialState = {
    title: "Gainsight Lite",
    isDetailView: false,
    selectedTab: 0,
    timeline: {
      selectedActivity: null,
      isRefreshing: false,
      links: {next: null},
      page: {
        number: 0
      },
      activities: [],
      isLoading: false
    },
    cta: {
      selectedCta: null
    }
}