# @orloxx/ui-core

> UI Core Components for React

[![NPM](https://img.shields.io/npm/v/@orloxx/ui-core.svg)](https://www.npmjs.com/package/@orloxx/ui-core) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This is an attempt to create a components library to bootstrap React SPAs.

## Install

```bash
npm install --save @orloxx/ui-core
```

## Usage

App.js

```js
import './App.scss';

import React, { Component } from 'react';
import { PageControl } from '@orloxx/ui-core';
import { Page01, Page02, Page03 } from './pages';

class App extends Component{
  static get routes() {
    return [
      { name: 'Main', to: '/', component: Page01 },
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
```

App.scss

```scss
@import "~@orloxx/ui-core/scss/index";

@include reset();

@import "~@orloxx/ui-core/scss/page-control";
```

## License

MIT © [orloxx](https://github.com/orloxx)
