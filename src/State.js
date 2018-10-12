export const initialState = {
    title: "Gainsight Lite",
    isDetailView: false,
    selectedTab: 0,
    searchText: "",
    signin:{
        showLoader:true
    },
    timeline: {
      selectedActivity: null,
      isRefreshing: false,
      links: {next: null},
      page: {
        number: 0
      },
      activities: [],
      isLoading: false,
      selfMode: false
    },
    cta: {
      selectedCta: null,
      ctas: [],
      isLoading: false,
      isRefreshing: false
    }
}