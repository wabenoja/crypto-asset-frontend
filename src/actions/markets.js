import {
  GET_MARKET_DATA
} from "./types";

import MarketDataService from "../services/markets.service";

export const findMarketData = (exchange, quoteAsset) => async (dispatch) => {
  try {
    const res = await MarketDataService.getMarketData( exchange, quoteAsset );

    dispatch({
      type: GET_MARKET_DATA,
      payload: res.data
    });

  } catch (err) {
    console.log(err);
  }
};

export const addFavoriteAsset = (symbol) => async (dispatch) => {
  try {
    await MarketDataService.addFavoriteAsset( symbol );
  } catch (err) {
    console.log(err);
  }
};

export const removeFavoriteAsset = (symbol) => async (dispatch) => {
  try {
    await MarketDataService.removeFavoriteAsset( symbol );
  } catch (err) {
    console.log(err);
  }
};

export const addBadAsset = (symbol) => async (dispatch) => {
  try {
    await MarketDataService.addBadAsset( symbol );
  } catch (err) {
    console.log(err);
  }
};

export const removeBadAsset = (symbol) => async (dispatch) => {
  try {
    await MarketDataService.removeBadAsset( symbol );
  } catch (err) {
    console.log(err);
  }
};