import * as types from "./actionTypes";
import {
  fetchAddresses,
} from "../../service/api";

const receivedData = json => ({
  type: types.RECEIVE_ADDRESS_DATA,
  data: {
    entities: json,
    waiting: false,
    error: false,
    error_detail: {}
  }
});

const executingAPI = () => ({
  type: types.FETCH_ADDRESS_DATA,
  data: {
    waiting: true,
    error: false,
    error_detail: {}
  }
});

const errorOnExecuteAPIRequest = e => {
  return {
    type: types.FETCH_ADDRESS_DATA_ERROR,
    data: {
      waiting: false,
      error: true,
      error_detail: e
    }
  };
};

export const getAddresses = (addressText) => {
  return (dispatch) => {
    dispatch(executingAPI());
    return fetchAddresses(addressText)
      .then(response => response.json())
      .then(json => dispatch(receivedData(json)))
      .catch(e => dispatch(errorOnExecuteAPIRequest(e)));
  };
};

