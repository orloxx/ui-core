import React from 'react';
import PropTypes from 'prop-types';
import Field from './field.view';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons';

/**
 * Controls input of type checkbox
 *
 * #### SCSS Import
 * ```
 * @import "~@orloxx/ui-core/scss/form/checkbox-field";
 * ```
 *
 * @extends {Field}
 *
 * @example
 * <CheckboxField id='policy' name='policy' label='Policy'>
 *   Please accept the <a href="/policy">policy</a> to continue
 * </CheckboxField>
 */
class CheckboxField extends Field {
  /**
   *
   * @type {Object}
   * @property {Array<HTMLOptionElement>} children - The checkbox HTML text
   * @property {Boolean} [checked] - If the checkbox is checked or not
   */
  static propTypes = Object.assign({}, Field.propTypes, {
    children: PropTypes.array.isRequired,
    checked: PropTypes.bool,
  });

  /**
   * @ignore
   */
  static defaultProps = Object.assign({}, Field.defaultProps, {
    children: [],
    checked: false,
  });

  /**
   * @ignore
   */
  constructor(props) {
    super(props);

    /**
     * @ignore
     */
    this.state = {
      isChecked: props.checked,
    };
  }

  /**
   * @ignore
   */
  get label() {
    const { children, label } = this.props;
    return children.length ? children : label;
  }

  /**
   * @ignore
   */
  onChange() {
    this.setState({ isChecked: this.input.current.checked });
    this.validate();
  }

  /**
   * @ignore
   */
  get isValid() {
    const { required } = this.props;
    if (required) {
      const { current } = this.input;
      return current.checked;
    }
    return true;
  }

  /**
   * @ignore
   */
  renderCheckbox() {
    const { isChecked } = this.state;
    if (isChecked) {
      return (<FA icon={faCheckSquare} />);
    }
    return (<FA icon={faSquare} />);
  }

  /**
   * @ignore
   */
  render() {
    const { id, name, label, required } = this.props;
    return (
      <div className={`field checkbox ${this.fieldClasses}`}>
        <label className='field__label checkbox__label' htmlFor={id}>
          <input
            className='field__input hideAccessible' ref={this.input}
            type='checkbox'
            id={id} name={name}
            title={label} required={required}
            checked={this.state.isChecked}
            onChange={() => this.onChange()}
            onBlur={() => this.validate()} />
          <div className='checkbox__wrapper'>
            <div className='checkbox__icon'>{this.renderCheckbox()}</div>
            <div className='checkbox__text'>{this.label}</div>
          </div>
        </label>
        {this.renderValidationMessages()}
      </div>
    );
  }
}

export default CheckboxField;
