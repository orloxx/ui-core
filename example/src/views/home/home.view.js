import React, { Component } from 'react';

export class Home extends Component {
  render() {
    return (
      <section className='home container'>
        <h1>@orloxx/ui-core</h1>
        <p>This is an attempt to create a personal library to reuse React Components. For now there're only 4 components implemented:</p>
        <ul>
          <li>PageControl</li>
          <li>Navigation</li>
          <li>ImageFile</li>
          <li>ImageUploader</li>
        </ul>
        <p>Moreover, there's also a SCSS library to add to the project so the components have an initial style that can be overwritten.</p>
        <p>This will be updated as soon as I have a working examples</p>
      </section>
    );
  }
}
