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
   * @property {String} placeholder - Placeholder text
   */
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    required: PropTypes.bool,
    pattern: PropTypes.string,
    placeholder: PropTypes.string,
  };

  /**
   * @ignore
   */
  static defaultProps = {
    type: 'text',
  };

  /**
   * @ignore
   */
  render() {
    return (
      <div className='field'>
        <label className='field__label' htmlFor={this.props.id}>
          {this.props.label}
        </label>
        <input
          className='field__input'
          type={this.props.type}
          id={this.props.id}
          name={this.props.name}
          placeholder={this.props.placeholder}
          title={this.props.placeholder}
          required={this.props.required}
          pattern={this.props.pattern} />
      </div>
    );
  }
}

export default Field;
