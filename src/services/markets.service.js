import http from "../http-common";

class MarketDataService {
  getMarketData(exchange, quoteAsset) {
    return http.get(`/currencies?exchange=${exchange}&quoteAsset=${quoteAsset}`);
  }

  addFavoriteAsset(symbol) {
    return http.post(`/currencies/favorite/${symbol}`);
  }

  removeFavoriteAsset(symbol) {
    return http.delete(`/currencies/favorite/${symbol}`);
  }

  addBadAsset(symbol) {
    return http.post(`/currencies/bad/${symbol}`);
  }

  removeBadAsset(symbol) {
    return http.delete(`/currencies/bad/${symbol}`);
  }
}

export default new MarketDataService();