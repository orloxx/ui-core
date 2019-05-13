import React from 'react';
import Field from './field.view';

/**
 * Controls the textarea input
 *
 * @extends {Field}
 *
 * @example
 * <TextareaField id='email' name='email' label='Email' />
 */
class TextareaField extends Field {
  render() {
    const { id, name, label, required } = this.props;
    return (
      <div className={`field ${this.fieldClasses}`}>
        <label className='field__label' htmlFor={id}>{label} {this.requiredLabel}</label>
        <div className='field__inputWrapper'>
          <textarea
            className='field__input' ref={this.input}
            id={id} name={name}
            required={required}
            onBlur={() => this.onBlur()} />
          {this.renderValidationIcon()}
        </div>
        {this.renderValidationMessages()}
      </div>
    );
  }
}

export default TextareaField;
