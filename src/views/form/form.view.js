import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Controls the form element and validates all children when trying to submit
 *
 * @extends {react~Component}
 *
 * @example
 * <Form action='http://someaction.example.com/'>
 *   <ImageField id='avatar' name='avatar' label='Avatar' />
 *   <Field id='username' name='username'
 *     label='Username' placeholder='Enter your username'
 *     suggestion='Only accepts letters and numbers'
 *     patternError='Input format is wrong, only accepts letters and numbers'
 *     required pattern='^[a-zA-Z0-9]+$' />
 *   <Field id='name' name='name'
 *     label='Name' placeholder='Enter your full name' />
 *   <EmailField id='email' name='email'
 *     label='Email' placeholder='Enter your email address' />
 *   <DropdownField id='sex' name='sex' label='Sex' placeholder='Select one' required>
 *     <option value='M'>Male</option>
 *     <option value='F'>Female</option>
 *   </DropdownField>
 *   <TextareaField id='comments' name='comments' label='Comments'
 *     suggestion='This field has a 100 character limit'
 *     maxChars={100} maxCharsError='Character limit reached' />
 * </Form>
 */
class Form extends Component {
  /**
   * @type {Object}
   * @property {String} action - The form action attribute
   * @property {Function} onSubmit - Triggers when the user submits a valid form
   * @property {Function} [onCancel] - Triggers when the user clicks the cancel button
   * @property {String} [method='GET'] - The method to use when submitting the form
   */
  static propTypes = {
    action: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
    method: PropTypes.string,
  };

  /**
   * @ignore
   */
  static defaultProps = {
    children: [],
    method: 'GET',
  };

  /**
   * @ignore
   */
  constructor(props) {
    super(props);

    /**
     * @ignore
     */
    this.instances = {};
  }

  /**
   * @ignore
   */
  componentWillMount() {
    /**
     * @ignore
     */
    this.children = this.props.children.map(el => React.cloneElement(el, {
      key: el.props.id || Math.random().toString(36).slice(-8),
      ref: this.addChildInstance.bind(this, el),
    }));
  }
  /**
   * @ignore
   */
  addChildInstance(el, instance) {
    if (el.props.id && typeof el.type !== 'string') {
      this.instances[el.props.id] = instance;
    }
  }

  /**
   * @ignore
   */
  onSubmit(e) {
    e.preventDefault();
    const invalidFields = Object.keys(this.instances).filter((key) => {
      const component = this.instances[key];
      component.validate();
      return !component.isValid;
    });
    const { onSubmit } = this.props;
    if (onSubmit && !invalidFields.length) {
      onSubmit(e);
    }
  }

  onCancel() {
    const { onCancel } = this.props;
    if (onCancel) {
      onCancel();
    }
  }

  /**
   * @ignore
   */
  render() {
    const { action, method } = this.props;
    return (
      <form
        action={action} method={method}
        onSubmit={e => this.onSubmit(e)}
        noValidate>
        {this.children}
        <div className='buttonGroup'>
          <button
            className='button button--secondary' type='button'
            onClick={() => this.onCancel()}>Cancel</button>
          <button className='button' type='submit'>Save</button>
        </div>
      </form>
    );
  }
}

export default Form;
