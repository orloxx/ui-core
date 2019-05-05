import React, { Component } from 'react';
import { Field, ImageField } from '@orloxx/ui-core';

export class Form extends Component {
  render() {
    return (
      <section className='form container'>
        <h1>Form</h1>
        <form action=''>
          <Field id='text1' name='text1' label='Some label1' placeholder='Insert value1' />
          <Field id='text2' name='text2' label='Some label2' placeholder='Insert value2' />
          <Field id='text3' name='text3' label='Some label3' placeholder='Insert value3' />
          <ImageField id='image' name='image' label='Upload image' />
        </form>
      </section>
    );
  }
}
