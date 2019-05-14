import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Field from './field.view';

// loader data
const RADIUS = 13;
const STROKE = 3;
const MAX_STROKE = 2 * Math.PI * RADIUS;
const MAX_SIZE = (RADIUS * 2) + (STROKE * 2);

/**
 * Controls the textarea input
 *
 * #### SCSS Import
 * ```
 * @import "~@orloxx/ui-core/scss/form/textarea-field";
 * ```
 *
 * @extends {Field}
 *
 * @example
 * <TextareaField id='email' name='email' label='Email' />
 */
class TextareaField extends Field {
  /**
   * @type {Object}
   * @property {number} [maxChars] - The maximum number of characters limit
   * @property {String} [maxCharsError='You reached the maximum number of characters allowed'] - The error message when the number of characters has been reached
   */
  static propTypes = Object.assign({}, Field.propTypes, {
    maxChars: PropTypes.number,
    maxCharsError: PropTypes.string,
  });

  /**
   * @ignore
   */
  static defaultProps = Object.assign({}, Field.defaultProps, {
    maxCharsError: 'You reached the maximum number of characters allowed',
  });

  /**
   * @ignore
   */
  constructor(props) {
    super(props);

    /**
     * @ignore
     */
    this.state = Object.assign({}, this.state, {
      strokeDashoffset: MAX_STROKE,
      extraChars: 0,
    });
  }

  /**
   * @ignore
   */
  get loaderStyles() {
    return {
      strokeDashoffset: this.state.strokeDashoffset,
      strokeDasharray: MAX_STROKE,
    };
  }

  /**
   * @ignore
   */
  get loaderClass() {
    const { current } = this.input;
    if (current) {
      const { maxChars } = this.props;
      const offset = maxChars * 0.20;
      if (this.state.extraChars) {
        return 'textarea__loaderFront--error';
      } else if (current.value.length > maxChars - offset) {
        return 'textarea__loaderFront--warning';
      }
    }
    return '';
  }

  /**
   * @ignore
   */
  get fieldClasses() {
    return super.fieldClasses || this.state.extraChars ? 'field--error' : '';
  }

  /**
   * @ignore
   */
  get isValid() {
    return super.isValid && !this.state.extraChars;
  }

  /**
   * @ignore
   */
  componentDidUpdate(prevProps, prevState) {
    if (prevState.extraChars !== this.state.extraChars) {
      this.validate();
    }
  }

  /**
   * @ignore
   */
  onChange() {
    if (this.props.maxChars) {
      const { current } = this.input;
      const percentDone = current.value.length / this.props.maxChars;
      const strokeDashoffset = Math.max(0, MAX_STROKE - MAX_STROKE * percentDone);
      this.setState({
        strokeDashoffset,
        extraChars: Math.max(0, current.value.length - this.props.maxChars),
      });
    }
    this.validate();
  }

  /**
   * @ignore
   */
  renderValidationIcon() {
    if (this.state.extraChars) {
      return (<div className='field__icon field__icon--invalid'>
        <FA icon={faTimesCircle} /></div>);
    }
    return super.renderValidationIcon();
  }

  /**
   * @ignore
   */
  renderValidationMessages() {
    if (this.props.maxChars && this.state.extraChars) {
      return (<em className='field__msg field__msg--error'>
        {this.props.maxCharsError}
        &nbsp;({-this.state.extraChars})
      </em>);
    }
    return super.renderValidationMessages();
  }

  /**
   * @ignore
   */
  renderCharLoader() {
    if (this.props.maxChars) {
      return (
        <div className='field__icon'>
          <svg className='textarea__loader' height={MAX_SIZE} width={MAX_SIZE}>
            <circle
              className='textarea__loaderBack'
              cx='50%' cy='50%' r={RADIUS} fill='none' stroke='currentColor'
              strokeWidth='1' />
            <circle
              className={`textarea__loaderFront ${this.loaderClass}`}
              cx='50%' cy='50%' r={RADIUS} fill='none' stroke='currentColor'
              strokeWidth={STROKE}
              style={this.loaderStyles} />
          </svg>
        </div>
      );
    }
  }

  /**
   * @ignore
   */
  render() {
    const { id, name, label, required } = this.props;
    return (
      <div className={`field textarea ${this.fieldClasses}`}>
        <label className='field__label' htmlFor={id}>{label} {this.requiredLabel}</label>
        <div className='field__inputWrapper'>
          <textarea
            className='field__input textarea__input' ref={this.input}
            id={id} name={name}
            required={required}
            onChange={() => this.onChange()} />
          {this.renderValidationIcon()}
          {this.renderCharLoader()}
        </div>
        {this.renderValidationMessages()}
      </div>
    );
  }
}

export default TextareaField;
