import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeService from "./js/currency-exchange-service.js";

function getExchange() {
  ExchangeService.getExchange()
    .then(function(response) {
      if (response.result === 'success') {
        printResults(response);
      } else {
        printError(response);
      }
    });
}

