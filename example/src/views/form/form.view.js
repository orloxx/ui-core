import React, { Component } from 'react';
import {
  Field, ImageField, EmailField, DropdownField,
  TextareaField, Form, CheckboxField, RadioField,
} from '@orloxx/ui-core';

export class FormView extends Component {
  render() {
    return (
      <section className='form container'>
        <h1>Form</h1>
        <Form action='https://someaction.example.com/' onSubmit={() => console.log('SUBMIT!')}>
          <ImageField id='avatar' name='avatar' label='Avatar' />
          <RadioField id='salutation-1' name='salutation' label='Salutation' required>
            <option value='1'>Mr.</option>
            <option value='2'>Mrs.</option>
            <option value='3'>Miss.</option>
          </RadioField>
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
          <TextareaField id='comments' name='comments' label='Comments'
                         suggestion='This field has a 100 character limit'
                         maxChars={100} maxCharsError='Character limit reached' />
          <CheckboxField id='policy' name='policy' label='Policy' required>
            Please accept the <a href='/' title='policy' target='_blank'>policy</a> to continue
          </CheckboxField>
        </Form>
      </section>
    );
  }
}
