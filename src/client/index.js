import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import CodeWithMe from './codeWithMe.js'

console.log('rendering from index.js');
ReactDOM.render(
  <CodeWithMe />,
  document.getElementById('root')
);
