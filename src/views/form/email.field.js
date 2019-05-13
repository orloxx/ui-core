import Field from './field.view';

/**
 * Controls input of type email
 *
 * @extends {Field}
 *
 * @example
 * <EmailField id='email' name='email' label='Email' />
 */
class EmailField extends Field {
  /**
   * @ignore
   */
  static defaultProps = Object.assign({}, Field.defaultProps, {
    type: 'email',
    pattern: '^(([^<>()[\\].,;:\\s@"]+(\\.[^<>()[\\].,;:\\s@"]+)*)|(".+"))@(([^<>()[\\].,;:\\s@"]+\\.)+[^<>()[\\].,;:\\s@"]{2,})$',
  });
}

export default EmailField;
