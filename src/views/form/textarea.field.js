import React from 'react';
import PropTypes from 'prop-types';
import Field from './field.view';

const RADIUS = 13;
const STROKE = 3;
const MAX_STROKE = 2 * Math.PI * RADIUS;
const MAX_SIZE = (RADIUS * 2) + (STROKE * 2);

/**
 * Controls the textarea input
 *
 * #### SCSS Import
 * ```
 * @import "~@orloxx/ui-core/scss/form/textarea";
 * ```
 *
 * @extends {Field}
 *
 * @example
 * <TextareaField id='email' name='email' label='Email' />
 */
class TextareaField extends Field {
  static propTypes = Object.assign({}, Field.propTypes, {
    maxChars: PropTypes.number,
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
  onChange() {
    if (this.props.maxChars) {
      const { current } = this.input;
      const percentDone = current.value.length / this.props.maxChars;
      const strokeDashoffset = Math.max(0, MAX_STROKE - MAX_STROKE * percentDone);
      this.setState({ strokeDashoffset });
    }
    this.onBlur();
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
              className='textarea__loaderFront'
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
            onChange={() => this.onChange()}
            onBlur={() => this.onBlur()} />
          {this.renderValidationIcon()}
          {this.renderCharLoader()}
        </div>
        {this.renderValidationMessages()}
      </div>
    );
  }
}

export default TextareaField;
