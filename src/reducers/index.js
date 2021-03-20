import { combineReducers } from "redux";
import appStateReducer from "./appStateReducer";
import personReducer from "./personReducer";

export default combineReducers({
  person: personReducer,
  appState: appStateReducer,
});
