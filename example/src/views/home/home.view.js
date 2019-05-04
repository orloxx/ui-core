import React, { Component } from 'react';
import bitcoinImg from './bitcoin.jpg';

export class Home extends Component {
  render() {
    return (
      <section className='home container'>
        <h1>UI Core</h1>
        <p>This is an attempt to create a components library to bootstrap React SPAs</p>
        <ul>
          <li><a href='https://orloxx.github.io/ui-core/docs/'
                 target='_blank' rel='noopener noreferrer'>JS documentation</a></li>
        </ul>
        <p>I can always use a beer <span role='img' aria-label='Oh beer'>&#x1F37A;</span> or two :)</p>
        <p>Bitcoin: 1sSBBuBgnapZ1Zxmf9PYoBMxv8kN6Wggb</p>
        <p><img src={bitcoinImg} alt='Donate Bitcoin' /></p>
      </section>
    );
  }
}
