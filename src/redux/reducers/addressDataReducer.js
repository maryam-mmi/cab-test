import initialState from "./initialState";
import {
  FETCH_ADDRESS_DATA,
  RECEIVE_ADDRESS_DATA,
  FETCH_ADDRESS_DATA_ERROR,
} from "../actions/actionTypes";
import { mergeDeepRight } from "ramda";

export default function stuff(state = initialState.data, action) {
  switch (action.type) {
    case FETCH_ADDRESS_DATA:
    case RECEIVE_ADDRESS_DATA:
    case FETCH_ADDRESS_DATA_ERROR:
      return mergeDeepRight(state, action.data);
    default:
      return state;
  }
}
