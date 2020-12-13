import 'framework7/css/framework7.bundle.min.css';
import './index.css';
import 'framework7-icons';

import React from 'react';
import ReactDOM from 'react-dom';

import Framework7 from 'framework7/framework7.esm.bundle';
import Framework7React, { F7App } from 'framework7-react';
import Docs from './Docs';
import { routes } from './pages';

Framework7.use(Framework7React);

ReactDOM.render(
  <F7App
    params={{
      routes
    }}
  >
    <Docs />
  </F7App>,
  document.getElementById('root')
);
