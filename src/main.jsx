import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import App from './App.jsx'

// React 17 render syntax
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
