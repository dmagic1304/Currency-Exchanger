export default class ExchangeService {
  static getExchange() {
    return fetch(`https://v6.exchangerate-api.com/v6/45ea99a013aeb10f2376abf0/latest/USD`)
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