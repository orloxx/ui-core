import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import * as ImageUtils from '../../utils/image';

class ImageUploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageData: null,
    };
  }

  get hasImageClassName() {
    return this.imageSrc ? 'imageUploader--hasImage' : '';
  }

  get imageSrc() {
    const { imageData } = this.state;
    const { src } = this.props;
    return imageData || src;
  }

  setImage(e) {
    const file = e.target.files[0];
    const maxKb = this.props.fileSize || 256;
    const maxSize = maxKb * 1024;

    if (file && file.size > maxSize) {
      alert(`File cannot be greater than ${maxKb}Kb. Image will be removed.`);
      e.target.value = null;
      this.setState({ imageData: null });
      return;
    }
    this.setImageData(file);
  }

  setImageData(file) {
    if (file) {
      ImageUtils.getFileData(file).then(imageData => this.setState({ imageData }));
    }
  }

  render() {
    const { id, name, caption } = this.props;
    return (
      <div className={`imageUploader ${this.hasImageClassName}`}>
        <label className='button imageUploader__label' htmlFor={id}>
          <img
            className='imageUploader__image'
            src={this.imageSrc}
            alt='Upload'
          />
          <input type='hidden' name={name} value={this.imageSrc} />
          <input
            className='imageUploader__input'
            id={id}
            name='image-uploader-file'
            type='file'
            accept='image/*'
            onChange={e => this.setImage(e)}
          />
          <FA className='imageUploader__noImageIcon' icon={faUpload} />
          {caption || 'Upload image'}
        </label>
      </div>
    );
  }
}

ImageUploader.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  caption: PropTypes.string,
  src: PropTypes.string,
  fileSize: PropTypes.number,
};

ImageUploader.defaultProps = {
  src: '',
};

export default ImageUploader;
