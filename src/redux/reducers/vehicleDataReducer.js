import initialState from "./initialState";
import {
    FETCH_VEHICLE_DATA,
    RECEIVE_VEHICLE_DATA,
    FETCH_VEHICLE_DATA_ERROR,
} from "../actions/actionTypes";
import { mergeDeepRight } from "ramda";

export default function stuff(state = initialState.data, action) {
  switch (action.type) {
    case FETCH_VEHICLE_DATA:
    case RECEIVE_VEHICLE_DATA:
    case FETCH_VEHICLE_DATA_ERROR:
      return mergeDeepRight(state, action.data);
    default:
      return state;
  }
}