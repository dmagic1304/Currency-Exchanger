export default function directionSwitch() {
  const button = document.getElementById('switch');
  if (button.innerText === 'Convert foreign currency to USD') {
    button.innerText = 'Convert USD to foreign currency';
    button.setAttribute('value', 1);
    document.getElementById('input-label').innerText = 'Enter the amount in foreign currency:'
  } else {
    button.innerText = 'Convert foreign currency to USD';
    button.setAttribute('value', 0);
    document.getElementById('input-label').innerText = 'Enter the amount in USD $'
  }
}