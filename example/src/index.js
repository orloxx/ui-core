import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import { PageControl } from '@orloxx/ui-core';
import { Home, Text } from './views';

const routes = [
  { name: 'UI Core', to: '/', component: Home },
  { name: 'Text example', to: '/some-text', component: Text },
];

ReactDOM.render(<PageControl base='/ui-core' routes={routes} />,
  document.getElementById('root'));
