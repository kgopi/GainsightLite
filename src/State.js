export const initialState = {
  title: "Gainsight Lite",
  isDetailView: false,
  selectedTab: 0,
  searchText: "",
  signin: {
      showLoader: true
  },
  signout: {
    showLoader: false
  },
  timeline: {
      selectedActivity: null,
      isRefreshing: false,
      links: {
          next: null
      },
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
  },
  sally: {
      messages: [],
      sallyAuthToken: ""
  }
}