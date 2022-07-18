import { combineReducers } from "redux";
import chartReducer from "./chartReducer";
import statisticReducer from "./statisticReducer";
import detailReducer from "./detailReducer";
import listReducer from "./listReducer";

const rootReducer = combineReducers({
  chart: chartReducer,
  statistic: statisticReducer,
  detail: detailReducer,
  list: listReducer
});

export default rootReducer;
