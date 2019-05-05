import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import { PageControl } from '@orloxx/ui-core';
import { Home, Text, Form } from './views';

const tripleNestedRoutes = [
  { name: 'Nested example 1.3.1', to: '/nested1.3.1', component: Text },
  { name: 'Nested example 1.3.2', to: '/nested1.3.2', component: Text },
  { name: 'Nested example 1.3.3', to: '/nested1.3.3', component: Text },
];

const nestedRoutes = [
  { name: 'Nested example 1.1', to: '/nested1.1', component: Text },
  { name: 'Nested example 1.2', to: '/nested1.2', component: Text },
  { name: 'Nested example 1.3', to: '/nested1.3', component: Text, children: tripleNestedRoutes },
  { name: 'Nested example 1.4', to: '/nested1.4', component: Text },
];

const routes = [
  { name: 'UI Core', to: '/', component: Home },
  { name: 'Text example', to: '/text', component: Text },
  { name: 'Form example', to: '/form', component: Form, children: nestedRoutes },
  { name: 'Text example1', to: '/text1', component: Text },
  { name: 'Text example2', to: '/text2', component: Text },
  { name: 'Text example3', to: '/text3', component: Text },
  { name: 'Text example4', to: '/text4', component: Text },
];

ReactDOM.render(<PageControl base='/ui-core' routes={routes} />,
  document.getElementById('root'));
