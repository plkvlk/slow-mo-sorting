import React from 'react';
import ReactDOM from 'react-dom';

import './assets/index.css';

import {BarChart} from './bar-chart';


ReactDOM.render(
  <BarChart count="40" speed="64"/>,
  document.getElementById('root')
);

