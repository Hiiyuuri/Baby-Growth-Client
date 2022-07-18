import { MOTHER_LIST_BY_RT_FETCH_SUCCESS } from "../actions/actionType";

const initialState = {
  motherList: []
};

function listReducer(state = initialState, action) {
  switch (action.type) {
    case MOTHER_LIST_BY_RT_FETCH_SUCCESS:
      return { ...state, motherList: action.payload };

    default:
      return state;
  }
}

export default listReducer;
