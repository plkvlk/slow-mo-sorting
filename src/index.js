import React from 'react';
import ReactDOM from 'react-dom';

import './assets/vendors/fontawesome-free-5.12.0-web/css/all.min.css';
import './assets/vendors/skeleton.css';
import './assets/index.css';

import {BarChart} from './bar-chart';


ReactDOM.render(
  <BarChart count="40" speed="64"/>,
  document.getElementById('root')
);

