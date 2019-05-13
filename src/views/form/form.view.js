import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Form extends Component {
  /**
   * @type {Object}
   * @property {Array<HTMLOptionElement>} children - Elements to show inside the form
   * @property {String} action - The form action attribute
   */
  static propTypes = {
    children: PropTypes.array.isRequired,
    action: PropTypes.string.isRequired,
  };

  /**
   * @ignore
   */
  renderChildren() {
    return this.props.children.map(el => el);
  }

  /**
   * @ignore
   */
  render() {
    return (
      <form action={this.props.action} noValidate>
        {this.renderChildren()}
        <div className='buttonGroup'>
          <button className='button button--secondary' type='button'>Cancel</button>
          <button className='button' type='submit'>Save</button>
        </div>
      </form>
    );
  }
}

export default Form;
