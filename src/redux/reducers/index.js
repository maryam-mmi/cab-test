import { combineReducers } from "redux";
import addressDataReducer from "./addressDataReducer";
import vehicleDataReducer from "./vehicleDataReducer";

const rootReducer = combineReducers({
  address_data: addressDataReducer,
  vehicle_data: vehicleDataReducer,
});

export default rootReducer;
