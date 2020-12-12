import 'framework7/css/framework7.bundle.min.css';
import './index.css';
import 'framework7-icons';

import React from 'react';
import ReactDOM from 'react-dom';

import Framework7 from 'framework7/framework7.esm.bundle';
import Framework7React from 'framework7-react';
import Docs from './Docs';

Framework7.use(Framework7React);

ReactDOM.render(<Docs />, document.getElementById('root'));
