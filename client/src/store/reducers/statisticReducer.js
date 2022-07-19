import {
  PREGNANT_MOTHER_DATA,
  GIZI_KURANG_TERBANYAK,
  GIZI_CUKUP_TERBANYAK,
  GIZI_BERLEBIH_TERBANYAK
} from "../actions/actionType";

const initialState = {
  pregnantMother: "Loading...",
  kurang: [],
  cukup: [],
  berlebih: []
};

function statisticReducer(state = initialState, action) {
  switch (action.type) {
    case PREGNANT_MOTHER_DATA:
      return { ...state, pregnantMother: action.payload };
    case GIZI_KURANG_TERBANYAK:
      return { ...state, kurang: action.payload };
    case GIZI_CUKUP_TERBANYAK:
      return { ...state, cukup: action.payload };
    case GIZI_BERLEBIH_TERBANYAK:
      return { ...state, berlebih: action.payload };

    default:
      return state;
  }
}

export default statisticReducer;
