import {
  PREGNANCY_DETAIL,
  MOTHER_DETAIL,
  MOTHER_PREGNANCY
} from "../actions/actionType";

const initialState = {
  motherData: {},
  motherProfile: {},
  motherPregnancy: {}
};

function detailReducer(state = initialState, action) {
  switch (action.type) {
    case PREGNANCY_DETAIL:
      return { ...state, motherData: action.payload };
    case MOTHER_DETAIL:
      return { ...state, motherProfile: action.payload };
    case MOTHER_PREGNANCY:
      return { ...state, motherPregnancy: action.payload };

    default:
      return state;
  }
}

export default detailReducer;
