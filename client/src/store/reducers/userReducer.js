import { ALL_USER_FETCH_SUCCESS, USER_DETAIL } from "../actions/actionType";

const initialState = {
  allUsers: [],
  userDetail: {}
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case ALL_USER_FETCH_SUCCESS:
      return { ...state, allUsers: action.payload };
    case USER_DETAIL:
      return { ...state, userDetail: action.payload };

    default:
      return state;
  }
}

export default userReducer;
