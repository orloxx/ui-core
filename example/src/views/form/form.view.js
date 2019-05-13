import React, { Component } from 'react';
import { Field, ImageField, EmailField, DropdownField } from '@orloxx/ui-core';

export class Form extends Component {
  render() {
    return (
      <section className='form container'>
        <h1>Form</h1>
        <form className='form' action=''>
          <ImageField id='avatar' name='avatar' label='Avatar' />
          <Field id='username' name='username'
                 label='Username' placeholder='Enter your username'
                 suggestion='Only accepts letters and numbers'
                 patternError='Input format is wrong, only accepts letters and numbers'
                 required pattern='^[a-zA-Z0-9]+$' />
          <Field id='name' name='name'
                 label='Name' placeholder='Enter your full name' />
          <EmailField id='email' name='email'
                      label='Email' placeholder='Enter your email address' />
          <DropdownField id='sex' name='sex' label='Sex' placeholder='Select one' required>
            <option value='M'>Male</option>
            <option value='F'>Female</option>
          </DropdownField>
          <button type='button' className='button'>Cancel</button> <button className='button'>Save</button>
        </form>
      </section>
    );
  }
}
