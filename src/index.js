import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeService from "./js/currency-exchange-service.js";
import currencyList from './js/currency-list.js';
import directionSwitch from './js/exchange-direction.js';

function getExchange() {
  ExchangeService.getExchange()
    .then(function(response) {
      if (response.result === 'success') {
        let keys = Object.keys(response.conversion_rates);
        let values = Object.values(response.conversion_rates);
        for(let i = 0; i < keys.length; i++) {
          sessionStorage.setItem(keys[i], values[i]);
        }
        currencyList(sessionStorage);
      } else {
        printError(response);
      }
    });
}

function printResults() {
  const rateParagraph = document.getElementById('rate');
  const totalParagraph = document.getElementById('total');
  const enteredAmount = document.getElementById('usd').value;
  const selectedCurrency = document.getElementById('exchange-option').value;
  const exchangeRate = sessionStorage.getItem(selectedCurrency);
  rateParagraph.innerHTML = null;
  totalParagraph.innerHTML= null;

  if (exchangeRate) {
    rateParagraph.append(`Current exchange rate for ${selectedCurrency} is ${exchangeRate}`);
    totalParagraph.append(`For $${enteredAmount} USD you will get ${(enteredAmount * exchangeRate).toFixed(2)} ${selectedCurrency}`);
  } else {
    rateParagraph.append(`Selected currency does not exist (${selectedCurrency}). Please make sure to select a valid currency from the list!`);
  }
}

function printForeignResults() {
  const rateParagraph = document.getElementById('rate');
  const totalParagraph = document.getElementById('total');
  const enteredAmount = document.getElementById('usd').value;
  const selectedCurrency = document.getElementById('exchange-option').value;
  const exchangeRate = sessionStorage.getItem(selectedCurrency);
  rateParagraph.innerHTML = null;
  totalParagraph.innerHTML= null;

  if (exchangeRate) {
    rateParagraph.append(`Current exchange rate for ${selectedCurrency} is ${exchangeRate}`);
    totalParagraph.append(`For ${enteredAmount} ${selectedCurrency} you will get $${(enteredAmount / exchangeRate).toFixed(2)} USD`);
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
  const button = document.getElementById('switch').value;
  console.log('test' + button);
  const rateParagraph = document.getElementById('rate');
  const totalParagraph = document.getElementById('total');
  const enteredAmount = document.getElementById('usd').value;
  if (enteredAmount > 0 && button === '0') {
    printResults();
  } else if (enteredAmount > 0 && button === '1') {
    printForeignResults();
  } else {    
    rateParagraph.innerHTML = null;    
    totalParagraph.innerHTML= null;
    rateParagraph.append(`Please enter a numeric value bigger than 0!`);
  }
}

window.addEventListener('load', function() {
  getExchange();  
  document.querySelector('form').addEventListener('submit', handleSubmit);
  document.getElementById('switch').addEventListener('click', directionSwitch);
});
