import React from 'react';
import PropTypes from 'prop-types';
import Field from './field.view';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faCircle, faDotCircle } from '@fortawesome/free-solid-svg-icons';

/**
 * Controls input of type radio
 *
 * #### SCSS Import
 * ```
 * @import "~@orloxx/ui-core/scss/form/radio-field";
 * ```
 *
 * @extends {Field}
 *
 * @example
 * <RadioField id='salutation-1' name='salutation' label='Salutation'>
 *   <option value='1' selected>Mr.</option>
 *   <option value='2'>Mrs.</option>
 * </RadioField>
 */
class CheckboxField extends Field {
  /**
   * @type {Object}
   * @property {Array<HTMLOptionElement>} children - Elements to show in the radiobutton list
   */
  static propTypes = Object.assign({}, Field.propTypes, {
    children: PropTypes.array.isRequired,
  });

  /**
   * @ignore
   */
  static defaultProps = Object.assign({}, Field.defaultProps, {
    children: [],
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
      selectedId: this.getRadioId(props.children.find(child => child.props.selected)),
    };
  }

  /**
   * @ignore
   */
  get isValid() {
    const { required } = this.props;
    if (required) {
      return !!this.state.selectedId;
    }
    return true;
  }

  /**
   * @ignore
   */
  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedId !== this.state.selectedId) {
      this.validate();
    }
  }

  /**
   * @ignore
   */
  getLabel(children) {
    const { label } = this.props;
    return children.length ? children : label;
  }

  /**
   * @ignore
   */
  getRadioId(child) {
    const { id } = this.props;
    if (child) {
      return `${id}-${child.props.value}`;
    }
    return null;
  }

  /**
   * @ignore
   */
  selectRadio(radio) {
    this.setState({
      selectedId: this.getRadioId(radio),
    });
  }

  /**
   * @ignore
   */
  renderRadioButton(radio) {
    const { selectedId } = this.state;
    if (selectedId === this.getRadioId(radio)) {
      return (<FA icon={faDotCircle} />);
    }
    return (<FA icon={faCircle} />);
  }

  renderInputs() {
    const { name, required } = this.props;
    return this.props.children.map(child => (
      <label
        className='radio__label' key={this.getRadioId(child)}
        htmlFor={this.getRadioId(child)}>
        <input
          className='field__input radio__input hideAccessible'
          type='radio' id={this.getRadioId(child)} name={name}
          title={this.getLabel(child.props.children)} required={required}
          onChange={() => this.selectRadio(child)}
          onBlur={() => this.validate()} />
        <div className='radio__wrapper'>
          <div className='radio__icon'>{this.renderRadioButton(child)}</div>
          <div className='radio__text'>{this.getLabel(child.props.children)}</div>
        </div>
      </label>
    ));
  }

  /**
   * @ignore
   */
  render() {
    const { label } = this.props;
    return (
      <div className={`field radio ${this.fieldClasses}`}>
        <label className='field__label'>{label}</label>
        {this.renderInputs()}
        <div className='radio__validation'>
          {this.renderValidationMessages()}
        </div>
      </div>
    );
  }
}

export default CheckboxField;
