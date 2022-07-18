import { combineReducers } from "redux";
import chartReducer from "./chartReducer";
import statisticReducer from "./statisticReducer";
import detailReducer from "./detailReducer";
import listReducer from "./listReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  chart: chartReducer,
  statistic: statisticReducer,
  detail: detailReducer,
  list: listReducer,
  user: userReducer
});

export default rootReducer;
