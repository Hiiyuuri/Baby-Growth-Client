import {
  PREGNANCY_DETAIL,
  MOTHER_DETAIL,
  MOTHER_PREGNANCY,
  RECORDED_DATE,
  BABY_ID
} from "../actions/actionType";

const initialState = {
  motherData: {},
  motherProfile: {},
  motherPregnancy: {},
  recordedDate: "",
  babyId: 0
};

function detailReducer(state = initialState, action) {
  switch (action.type) {
    case PREGNANCY_DETAIL:
      return { ...state, motherData: action.payload };
    case MOTHER_DETAIL:
      return { ...state, motherProfile: action.payload };
    case MOTHER_PREGNANCY:
      return { ...state, motherPregnancy: action.payload };
    case RECORDED_DATE:
      return { ...state, recordedDate: action.payload };
    case BABY_ID:
      return { ...state, babyId: action.payload };

    default:
      return state;
  }
}

export default detailReducer;
