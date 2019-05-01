import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageUtils } from '../../utils';

class ImageFile extends Component {
  static propTypes = {
    alt: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    file: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      imageData: null,
    };
  }

  componentDidMount() {
    const { file } = this.props;
    if (file) {
      ImageUtils.getFileData(file).then(imageData => this.setState({ imageData }));
    }
  }

  get src() {
    const { imageData } = this.state;
    return imageData;
  }

  get alt() {
    const { alt } = this.props;
    return alt;
  }

  render() {
    const { imageData } = this.state;
    const { className } = this.props;
    return imageData ? (
      <img
        className={`imageFile ${className}`}
        src={this.src}
        alt={this.alt}
      />
    ) : null;
  }
}

export default ImageFile;
