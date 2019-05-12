import React from 'react';
import Field from './field.view';
import PropTypes from 'prop-types';

/**
 * @external {HTMLOptionElement} https://developer.mozilla.org/en-US/docs/Web/API/HTMLOptionElement
 */

/**
 * Controls a dropdown type of input
 *
 * #### SCSS import:
 * ```
 * @import "~@orloxx/ui-core/scss/form/dropdown-field";
 * ```
 *
 * @extends {Field}
 *
 * @example
 * <DropdownField id='sex' name='sex' label='Sex'>
 *   <option value='M'>Male</option>
 *   <option value='F'>Female</option>
 * </DropdownField>
 */
class DropdownField extends Field {
  /**
   * @type {Object}
   * @property {Array<HTMLOptionElement>} children - Elements to show in the dropdown list
   */
  static propTypes = {
    children: PropTypes.array.isRequired,
  };

  /**
   * @ignore
   */
  constructor(props) {
    super(props);

    /**
     * @ignore
     */
    this.state = {
      isFocused: false,
      options: [],
      selectedOption: {
        id: '', label: '',
      },
    };
  }

  /**
   * @ignore
   */
  componentWillMount() {
    this.setState({
      options: this.props.children.map(el => {
        const option = {
          id: el.props.value,
          label: el.props.children,
          selected: el.props.selected,
        };
        if (el.props.selected) {
          this.setState({ selectedOption: option });
        }
        return option;
      }),
    });
  }

  /**
   * @ignore
   */
  onSelect(e, option) {
    e.preventDefault();
    this.setState({ selectedOption: option, isFocused: false });
  }

  /**
   * @ignore
   */
  handleFocus({ relatedTarget }) {
    const isFocused = relatedTarget &&
      (relatedTarget.classList.contains('dropdown__link') ||
      relatedTarget.classList.contains('dropdown__input'));
    this.setState({ isFocused });
  }

  /**
   * @ignore
   */
  renderOptions() {
    if (this.state.isFocused) {
      return this.state.options.map(option => (
        <li className='dropdown__item' key={option.id}>
          <a
            className='dropdown__link' href='' title={option.label}
            onClick={e => this.onSelect(e, option)}>{option.label}</a>
        </li>
      ));
    }
    return null;
  }

  /**
   * @ignore
   */
  render() {
    return (
      <div className='field dropdown' onBlur={e => this.handleFocus(e)}>
        <label className='field__label' htmlFor={this.props.id}>
          {this.props.label}
        </label>
        <input
          className='field__input dropdown__input' type='text' readOnly
          id={this.props.id}
          name={this.props.name}
          placeholder={this.props.placeholder}
          title={this.props.placeholder}
          required={this.props.required}
          value={this.state.selectedOption.label}
          onFocus={() => this.setState({ isFocused: true })} />
        <ul className='dropdown__list'>
          {this.renderOptions()}
        </ul>
      </div>
    );
  }
}

export default DropdownField;
