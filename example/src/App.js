import './App.scss';

import React, { Component } from 'react';
import { PageControl } from '@orloxx/ui-core';
import { Page01, Page02, Page03 } from './pages';

class App extends Component{
  static get routes() {
    return [
      { name: 'Some page 01', to: '/', component: Page01 },
      { name: 'Some page 02', to: '/page02', component: Page02 },
      { name: 'Some page 03', to: '/page03', component: Page03 },
    ];
  }

  render() {
    return (
      <PageControl base='/' routes={App.routes} />
    );
  }
}

export default App;
