import {
  GET_MARKET_DATA
} from "../actions/types";

const initialState = [];

function marketsReducer(markets = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_MARKET_DATA:
      return payload;
    default:
      return markets;
  }
};

export default marketsReducer;