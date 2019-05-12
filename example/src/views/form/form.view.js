import React, { Component } from 'react';
import { Field, ImageField, EmailField } from '@orloxx/ui-core';

export class Form extends Component {
  render() {
    return (
      <section className='form container'>
        <h1>Form</h1>
        <form action=''>
          <ImageField id='avatar' name='avatar' label='Avatar' />
          <Field id='username' name='username'
                 label='Username' placeholder='Enter your username' />
          <Field id='name' name='name'
                 label='Name' placeholder='Enter your full name' />
          <EmailField id='email' name='email'
                 label='Email' placeholder='Enter your email address' />
          <button className='button'>Cancel</button> <button className='button'>Save</button>
        </form>
      </section>
    );
  }
}