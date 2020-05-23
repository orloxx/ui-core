import React, { Component } from 'react';
import bitcoinImg from './bitcoin.jpg';

export class Home extends Component {
  static get BTC() {
    return '1MuQotL54dgTG1ounhkZtMB3DjPUP1yQ6C';
  }

  render() {
    return (
      <section className='home container'>
        <h1>UI Core</h1>
        <p>This is an attempt to create a components library to bootstrap React SPAs</p>
        <ul>
          <li><a href='https://orloxx.github.io/ui-core/docs/'>JS documentation</a></li>
        </ul>
        <h4>Donate (<span title='Bitcoin' aria-label='Bitcoin'>&#x20BF;itcoin</span>)</h4>
        <p><img src={bitcoinImg} alt='Donate Bitcoin' /></p>
        <p>{Home.BTC}</p>
        <p><a href="https://github.com/orloxx/ui-core">Return to Github Repository</a></p>
      </section>
    );
  }
}
