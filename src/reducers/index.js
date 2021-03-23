import { combineReducers } from "redux";
import addLocationReducer from "./addLocationReducer";
import appStateReducer from "./appStateReducer";
import personReducer from "./personReducer";
import registrationDataReducer from "./registrationDataReducer";

export default combineReducers({
  person: personReducer,
  appState: appStateReducer,
  addLocation: addLocationReducer,
  registrationData: registrationDataReducer,
});
