import './App.scss';

import React, { Component } from 'react';
import { PageControl } from '@orloxx/ui-core';
import { Home } from './views';

class App extends Component{
  static get routes() {
    return [
      { name: 'Home', to: '/', component: Home },
    ];
  }

  render() {
    return (
      <PageControl base='/' routes={App.routes} />
    );
  }
}

export default App;
