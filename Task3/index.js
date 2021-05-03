'use strict';

const getRequest = () => {
  const xhr = new XMLHttpRequest();
  xhr.open('get', 'http://jsonplaceholder.typicode.com/todos', true);
  xhr.responseType = 'json';
  xhr.onload = () => console.log(xhr.response);
  xhr.send();
};

const postRequest = () => {
  const xhr = new XMLHttpRequest();
  xhr.open('post', 'http://jsonplaceholder.typicode.com/todos', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = () => console.log(xhr.response);
  xhr.send(JSON.stringify({ title: 'Pass all exams', completed: false }));
};

const changeDOM = () => {
  const xhr = new XMLHttpRequest();
  xhr.open('get', 'http://jsonplaceholder.typicode.com/todos', true);
  xhr.onload = () => {
    const array = JSON.parse(xhr.response);
    const todos = document.getElementById('todos');
    for (const object of array.slice(0, 20)) {
      const todoClass = object.completed ? 'completed' : 'notCompleted';
      todos.innerHTML += `
        <div class="card ${todoClass}">
          <h1>${object.title[0].toUpperCase() + object.title.substring(1)}</h1>
        </div>
      `;
    }
  };
  xhr.send();
};

class AJAX {
  static get(url) {
    const xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.responseType = 'json';
    xhr.onload = () => console.log(xhr.response);
    xhr.send();
  }

  static post(url, data) {
    const xhr = new XMLHttpRequest();
    xhr.open('post', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.responseType = 'json';
    xhr.onload = () => console.log(xhr.response);
    xhr.send(data);
  }
}