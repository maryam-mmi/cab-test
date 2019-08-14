import * as types from "./actionTypes";
import {
  fetchVehicles,
} from "../../service/api";

const receivedData = json => ({
  type: types.RECEIVE_VEHICLE_DATA,
  data: {
    entities: json,
    waiting: false,
    error: false,
    error_detail: {}
  }
});

const executingAPI = () => ({
  type: types.FETCH_VEHICLE_DATA,
  data: {
    waiting: true,
    error: false,
    error_detail: {}
  }
});

const errorOnExecuteAPIRequest = e => {
  return {
    type: types.FETCH_VEHICLE_DATA_ERROR,
    data: {
      waiting: false,
      error: true,
      error_detail: e
    }
  };
};

export const getVehicles = (lat, lng) => {
  return (dispatch) => {
    dispatch(executingAPI());
    return fetchVehicles(lat, lng)
      .then(response => response.json())
      .then(json => dispatch(receivedData(json)))
      .catch(e => dispatch(errorOnExecuteAPIRequest(e)));
  };
};

