export default function currencyList(storageData){
  const displayElement = document.getElementById('exchange-option');
  const listOfCurrencies = Object.keys(storageData);
  for(let i = 0; i < listOfCurrencies.length; i++) {
    let option = document.createElement('option');
    option.setAttribute('value', listOfCurrencies[i]);
    option.append(listOfCurrencies[i]);
    displayElement.append(option);
  }
}