import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeService from "./js/currency-exchange-service.js";

// Business Logic
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

//UI Logic
function printResults(apiData) {
  const ul = document.querySelector('ul');
  let li = document.createElement('li');
  const selection = document.getElementById('exchange-option').value;
  li.append(`It will be ${apiData.conversion_rates[selection]}`);
  ul.append(li);
}

