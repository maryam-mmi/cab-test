import config from '../config';
import { pickBy, identity, isEmpty } from "ramda";

const fetchStatusHandler = async response => {
  if (response.status === 200) {
    return response;
  } else {
    throw await response.json();
  }
};

const buildQueryString = query =>
  query ? `?${query.map(([key, value]) => `${key}=${value}`).join("&")}` : ``;

const buildURL = (endpoint, query) => {
  return `${config.API_BASE_URL}${endpoint}${buildQueryString(query)}`;
};

const fetchData = ({
  url,
  method = "GET",
  headers = {},
  body = {},
  token = ""
}) => {
  if (token) {
    headers.push(["x-token", token]);
  }
  headers["Accept"] = "application/json";
  headers["Content-Type"] = "application/json";

  let requestOptions = pickBy(identity)({
    method,
    headers
  });
  if (!isEmpty(body)) requestOptions.body = JSON.stringify(body);
  return fetch(url, requestOptions).then(fetchStatusHandler);
};

export const fetchAddresses = (qString) => {
  let query = [];
  if (qString) query.push(["q", qString]);
  
  return fetchData({
    url: buildURL("/addresses", query)
  });
};

export const fetchVehicles = (lat, lng) => {
  let query = [];
  if (lat) query.push(["lat", lat]);
  if (lng) query.push(["lng", lng]);
  return fetchData({
    url: buildURL("/vehicles", query)
  });
};