import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Form extends Component {
  /**
   * @type {Object}
   * @property {Array<HTMLOptionElement>} children - Elements to show inside the form
   * @property {String} action - The form action attribute
   * @property {String} [method='GET'] - The method to use when submitting the form
   */
  static propTypes = {
    children: PropTypes.array.isRequired,
    action: PropTypes.string.isRequired,
    method: PropTypes.string,
  };

  /**
   * @ignore
   */
  static defaultProps = {
    method: 'GET',
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
    const { action, method } = this.props;
    return (
      <form action={action} method={method} noValidate>
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
