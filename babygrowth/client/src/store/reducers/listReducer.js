import {
  MOTHER_LIST_BY_RT_FETCH_SUCCESS,
  WATCHLIST_FETCH_SUCCESS
} from "../actions/actionType";

const initialState = {
  motherList: [],
  watchList: []
};

function listReducer(state = initialState, action) {
  switch (action.type) {
    case MOTHER_LIST_BY_RT_FETCH_SUCCESS:
      return { ...state, motherList: action.payload };
    case WATCHLIST_FETCH_SUCCESS:
      return { ...state, watchList: action.payload };

    default:
      return state;
  }
}

export default listReducer;
