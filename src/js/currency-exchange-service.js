export default class ExchangeService {
  static getExchange(currency) {
    return fetch(`GET https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${currency}`)
      .then(function(response) {
        if (!response.ok) {
          const errorMessage = `${response.status} ${response.text}`;
          throw new Error(errorMessage);
        } else {
          return response.json();
        }
      })
      .catch(function(error) {
        return error;
      });
  }
}