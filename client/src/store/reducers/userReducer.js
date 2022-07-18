import { ALL_USER_FETCH_SUCCESS } from "../actions/actionType";

const initialState = {
  allUsers: []
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case ALL_USER_FETCH_SUCCESS:
      return { ...state, allUsers: action.payload };

    default:
      return state;
  }
}

export default userReducer;
