'use strict';

const js = document.getElementById('js');
js.style.color = 'yellow';

const ts = document.getElementById('ts');
ts.innerText = ts.innerText.toUpperCase();

const h1 = document.querySelector('h1');
h1.style.textAlign = 'center';

const h2 = document.querySelector('#ts');
h2.onclick = () => h2.style.backgroundColor = 'red';

const h3s = document.querySelectorAll('h3');

h3s.forEach(value => value.onclick = () => {
  value.innerText = value.innerText + ' ' + value.innerText;
  value.style.backgroundColor = 'green';
});

const container = document.getElementById('container');
container.addEventListener('click', () => {
  container.innerHTML = `
    <h2>Click this button</h2>
    <button>Click</button>
  `;
});

document.getElementById('add').addEventListener('click', () => {
  document.querySelector('body').innerHTML += `
    <h1>King</h1>
    <h2>Queen</h2>
    <h3>Bishop</h3>
    <h4>Knight</h4>
    <h5>Rook</h5>
    <h6>Pawn</h6>
  `
});

const p = document.querySelector('p');
p.addEventListener('click', () => {
  p.classList.toggle('smaller');
});

const input = document.querySelector('input');
input.addEventListener('input', () => console.log(input.value));
