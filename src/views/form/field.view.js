import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Base class for all form fields. It's supposed to be used as a super class
 * but in case it's used as a component it renders an input type text
 *
 * #### SCSS Import
 * ```
 * @import "~@orloxx/ui-core/scss/form/field";
 * ```
 *
 * @example
 * <Field id='some-id' name='some-name' label='Some label' />
 */
class Field extends Component {
  /**
   * @type {Object}
   * @property {String} id - The input element id attribute
   * @property {String} name - The input element name attribute
   * @property {String} label - The label attached to the input field
   */
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool,
    pattern: PropTypes.string,
  };

  /**
   * @ignore
   */
  render() {
    return (
      <div className='field'>
        <label className='field__label' htmlFor={this.props.id}>
          <span className='field__labelSpan'>{this.props.label}</span>
          <input
            className='field__input'
            type='text'
            id={this.props.id}
            name={this.props.name}
            required={this.props.required}
            pattern={this.props.pattern} />
        </label>
      </div>
    );
  }
}

export default Field;
