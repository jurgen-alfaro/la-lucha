const loginReducer = (state, action) => {
  switch (action.type) {
    case "GET_USER":
      return {
        ...state,
        user: action.payload.user,
        isLoading: false,
      };
  }
};
