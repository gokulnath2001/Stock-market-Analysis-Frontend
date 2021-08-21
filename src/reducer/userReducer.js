const initState = undefined;

const userReducer = (state, action) => {
  switch (action.type) {
    case "ADD_USER":
      return action.value;
    case "REMOVE_USER":
      return initState;
    default:
      return state;
  }
};

export default userReducer;
