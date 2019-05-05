import React, { Component } from 'react';
import { Field, ImageField } from '@orloxx/ui-core';

export class Text extends Component {
  render() {
    return (
      <section className='text container'>
        <h1>Some h1</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lobortis velit ac libero suscipit ullamcorper. Sed velit arcu, maximus sit amet sapien sit amet, tempor rutrum ligula. Etiam quis odio at ipsum laoreet porttitor at a nulla. Nunc non justo sit amet ligula iaculis tempus. Pellentesque facilisis aliquet lacus ut placerat</p>
        <h2>Some h2</h2>
        <Field id='input' name='input' label='Some input' />
        <ImageField id='input2' name='input2' label='Some image' />
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lobortis velit ac libero suscipit ullamcorper. Sed velit arcu, maximus sit amet sapien sit amet, tempor rutrum ligula. Etiam quis odio at ipsum laoreet porttitor at a nulla. Nunc non justo sit amet ligula iaculis tempus. Pellentesque facilisis aliquet lacus ut placerat</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lobortis velit ac libero suscipit ullamcorper. Sed velit arcu, maximus sit amet sapien sit amet, tempor rutrum ligula. Etiam quis odio at ipsum laoreet porttitor at a nulla. Nunc non justo sit amet ligula iaculis tempus. Pellentesque facilisis aliquet lacus ut placerat</p>
        <h3>Some h3</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lobortis velit ac libero suscipit ullamcorper. Sed velit arcu, maximus sit amet sapien sit amet, tempor rutrum ligula. Etiam quis odio at ipsum laoreet porttitor at a nulla. Nunc non justo sit amet ligula iaculis tempus. Pellentesque facilisis aliquet lacus ut placerat</p>
        <h4>Some h4</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lobortis velit ac libero suscipit ullamcorper. Sed velit arcu, maximus sit amet sapien sit amet, tempor rutrum ligula. Etiam quis odio at ipsum laoreet porttitor at a nulla. Nunc non justo sit amet ligula iaculis tempus. Pellentesque facilisis aliquet lacus ut placerat</p>
        <h5>Some h5</h5>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lobortis velit ac libero suscipit ullamcorper. Sed velit arcu, maximus sit amet sapien sit amet, tempor rutrum ligula. Etiam quis odio at ipsum laoreet porttitor at a nulla. Nunc non justo sit amet ligula iaculis tempus. Pellentesque facilisis aliquet lacus ut placerat</p>
        <h6>Some h6</h6>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lobortis velit ac libero suscipit ullamcorper. Sed velit arcu, maximus sit amet sapien sit amet, tempor rutrum ligula. Etiam quis odio at ipsum laoreet porttitor at a nulla. Nunc non justo sit amet ligula iaculis tempus. Pellentesque facilisis aliquet lacus ut placerat</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lobortis velit ac libero suscipit ullamcorper. Sed velit arcu, maximus sit amet sapien sit amet, tempor rutrum ligula. Etiam quis odio at ipsum laoreet porttitor at a nulla. Nunc non justo sit amet ligula iaculis tempus. Pellentesque facilisis aliquet lacus ut placerat</p>
      </section>
    );
  }
}
