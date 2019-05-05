import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { ImageUtils } from '../../utils';
import Field from './field.view';

/**
 * Controls an input file element that shows a preview of the selected image
 *
 * #### SCSS import:
 * ```
 * @import "~@orloxx/ui-core/scss/form/image-field";
 * ```
 *
 * @extends {Field}
 *
 * @example
 * <ImageField id='image' name='image' />
 */
class ImageField extends Field {
  /**
   * @type {Object}
   * @property {String} [src] - Default image path when nothing is selected
   * @property {number} [fileSize=256Kb] - Maximum file size (Kb) accepted
   */
  static propTypes = Object.assign(Field.propTypes, {
    src: PropTypes.string,
    fileSize: PropTypes.number,
  });

  /**
   * @ignore
   */
  static defaultProps = {
    src: '',
    fileSize: 256,
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
      imageData: null,
    };
  }

  /**
   * @ignore
   */
  get hasImageClassName() {
    return this.imageSrc ? 'imageField--hasImage' : '';
  }

  /**
   * @ignore
   */
  get imageSrc() {
    const { imageData } = this.state;
    const { src } = this.props;
    return imageData || src;
  }

  /**
   * @ignore
   */
  setImage(e) {
    const file = e.target.files[0];
    const maxKb = this.props.fileSize;
    const maxSize = maxKb * 1024;

    if (file && file.size > maxSize) {
      alert(`File cannot be greater than ${maxKb}Kb. Image will be removed.`);
      e.target.value = null;
      this.setState({ imageData: null });
      return;
    }
    this.setImageData(file);
  }

  /**
   * @ignore
   */
  setImageData(file) {
    if (file) {
      ImageUtils.getFileData(file).then(imageData => this.setState({ imageData }));
    }
  }

  /**
   * @ignore
   */
  render() {
    const { id, name, label } = this.props;
    return (
      <div className={`imageField ${this.hasImageClassName}`}>
        <label className='button imageField__label' htmlFor={id}>
          <img
            className='imageField__image'
            src={this.imageSrc}
            alt='Upload'
          />
          <input type='hidden' name={name} value={this.imageSrc} />
          <input
            className='imageField__input'
            id={id}
            name='image-uploader-file'
            type='file'
            accept='image/*'
            onChange={e => this.setImage(e)}
          />
          <FA className='imageField__noImageIcon' icon={faUpload} />
          {label || 'Upload image'}
        </label>
      </div>
    );
  }
}

export default ImageField;
