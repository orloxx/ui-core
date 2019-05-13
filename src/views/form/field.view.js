import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

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
 * <Field id='username' name='username'
 *   label='Username' placeholder='Enter your username'
 *   suggestion='Only accepts letters and numbers'
 *   patternError='Input format is wrong, only accepts letters and numbers'
 *   required pattern='^[a-zA-Z0-9]+$' />
 */
class Field extends Component {
  /**
   * @type {Object}
   * @property {String} id - The input element `id` attribute
   * @property {String} name - The input element `name` attribute
   * @property {String} label - The label attached to the input field
   * @property {String} [type='text'] - The input element `type` attribute
   * @property {Boolean} [required] - The input element `required` attribute
   * @property {String} [pattern] - The pattern to validate the input's value
   * @property {String} [placeholder] - Placeholder text
   * @property {String} [requiredLabel='(required)'] - The required label added to the input's label
   * @property {String} [requiredError='This field is required'] - The error message when the required input is empty
   * @property {String} [patternError='Please enter correct format'] - The error message when the input's pattern is not matched
   * @property {String} [suggestion] - Suggestion text for the user
   */
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    required: PropTypes.bool,
    pattern: PropTypes.string,
    placeholder: PropTypes.string,
    requiredLabel: PropTypes.string,
    requiredError: PropTypes.string,
    patternError: PropTypes.string,
    suggestion: PropTypes.string,
  };

  /**
   * @ignore
   */
  static defaultProps = {
    type: 'text',
    requiredLabel: '(required)',
    requiredError: 'This field is required',
    patternError: 'Please enter correct format',
  };

  /**
   * @ignore
   */
  constructor(props) {
    super(props);

    /**
     * @ignore
     */
    this.input = React.createRef();

    /**
     * @ignore
     */
    this.state = { isValid: true, isPattern: true, isDirty: false };
  }

  /**
   * @ignore
   */
  get isValid() {
    const { required } = this.props;
    if (required) {
      const { current } = this.input;
      return !!current.value;
    }
    return true;
  }

  /**
   * @ignore
   */
  get isPattern() {
    const { pattern } = this.props;
    const { current } = this.input;
    if (pattern && current.value) {
      const reg = new RegExp(pattern, 'g');
      return reg.test(current.value);
    }
    return true;
  }

  /**
   * @ignore
   */
  get fieldClasses() {
    const { isValid, isPattern } = this.state;
    return !isValid || !isPattern ? 'field--error' : '';
  }

  /**
   * @ignore
   */
  get requiredLabel() {
    if (this.props.required) {
      return this.props.requiredLabel;
    }
  }

  /**
   * @ignore
   */
  onBlur() {
    this.setState({
      isDirty: true,
      isValid: this.isValid,
      isPattern: this.isPattern,
    });
  }

  /**
   * @ignore
   */
  renderValidationIcon() {
    const { isValid, isPattern, isDirty } = this.state;
    const { required, pattern } = this.props;
    if ((required || pattern) && isDirty) {
      return isValid && isPattern
        ? (<div className='field__icon field__icon--valid'>
          <FA icon={faCheckCircle} /></div>)
        : (<div className='field__icon field__icon--invalid'>
          <FA icon={faTimesCircle} /></div>);
    }
  }

  /**
   * @ignore
   */
  renderValidationMessages() {
    const { isValid, isPattern, isDirty } = this.state;
    if (isDirty) {
      if (!isValid) {
        return (<em className='field__msg field__msg--error'>
          {this.props.requiredError}
        </em>);
      } else if (!isPattern) {
        return (<em className='field__msg field__msg--error'>
          {this.props.patternError}
        </em>);
      }
    }
    if (this.props.suggestion) {
      return (<em className='field__msg'>{this.props.suggestion}</em>);
    }
  }

  /**
   * @ignore
   */
  render() {
    const { id, name, label, type, required, pattern, placeholder } = this.props;
    return (
      <div className={`field ${this.fieldClasses}`}>
        <label className='field__label' htmlFor={id}>{label} {this.requiredLabel}</label>
        <div className='field__inputWrapper'>
          <input
            className='field__input' ref={this.input}
            type={type} id={id} name={name}
            placeholder={placeholder} title={placeholder}
            required={required} pattern={pattern}
            onBlur={() => this.onBlur()} />
          {this.renderValidationIcon()}
        </div>
        {this.renderValidationMessages()}
      </div>
    );
  }
}

export default Field;
