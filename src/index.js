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
  const rateParagraph = document.getElementById('rate');
  const totalParagraph = document.getElementById('total');
  const enteredAmount = document.getElementById('usd').value;
  const selectedCurrency = document.getElementById('exchange-option').value;
  const exchangeRate = apiData.conversion_rates[selectedCurrency];
  rateParagraph.innerHTML = null;
  totalParagraph.innerHTML= null;

  if (exchangeRate) {
    rateParagraph.append(`Current exchange rate for ${selectedCurrency} is ${exchangeRate}.`)
    totalParagraph.append(`For ${enteredAmount} USD you will get ${(enteredAmount * exchangeRate).toFixed(2)} ${selectedCurrency}`);
  } else {
    rateParagraph.append(`Selected currency does not exist (${selectedCurrency}). Please make sure to select a valid currency from the list!`);
  }
}

function printError(apiError) {
  const rateParagraph = document.getElementById('rate');
  rateParagraph.append(`Not able to get requested data due to: ${apiError}`);
}

function handleSubmit(e) {
  e.preventDefault();
  const rateParagraph = document.getElementById('rate');
  const totalParagraph = document.getElementById('total');
  const enteredAmount = document.getElementById('usd').value;
  if (enteredAmount > 0) {
    getExchange();
  } else {    
    rateParagraph.innerHTML = null;    
    totalParagraph.innerHTML= null;
    rateParagraph.append(`Please enter a numeric value bigger than 0!`);
  }
}

window.addEventListener('load', function() {
  this.document.querySelector('form').addEventListener('submit', handleSubmit);
});
