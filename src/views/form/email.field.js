import Field from './field.view';

/**
 * Controls input of type email
 *
 * @extends {Field}
 *
 * @example
 * <EmailField id='email' name='email' label='Enter your email' />
 */
class EmailField extends Field {
  static defaultProps = {
    type: 'email',
  };
}

export default EmailField;
