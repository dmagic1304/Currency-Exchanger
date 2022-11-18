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

function printResults(apiData) {
  const displayParagraph = document.getElementById('result');
  const enteredAmount = document.getElementById('usd').value;
  const selectedCurrency = document.getElementById('exchange-option').value;
  const exchangeRate = apiData.conversion_rates[selectedCurrency];
  displayParagraph.innerHTML = null;
  if (exchangeRate) {
  displayParagraph.append(`Current exchange rate for ${selectedCurrency} is ${exchangeRate}. For ${enteredAmount} USD you will get ${enteredAmount * exchangeRate} ${selectedCurrency} `);
  } else {
    displayParagraph.append(`Unable to get data for selected currency (${selectedCurrency}). Please make sure to select a valid currency from the list!`);
  }
}

function printError(apiError) {
  const displayParagraph = document.getElementById('result');
  displayParagraph.append(`Not able to get requested data due to: ${apiError}`);
}

function handleSubmit(e) {
  e.preventDefault();
  getExchange();
}

window.addEventListener('load', function() {
  this.document.querySelector('form').addEventListener('submit', handleSubmit);
});
