import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMapModel from './google-map.model';

/**
 * Controls a map initialised with the Google Maps JavaScript API
 *
 * @see https://developers.google.com/maps/documentation/javascript/tutorial
 *
 * @example
 * <GoogleMap apiKey='your-google-api-key' />
 */
class GoogleMap extends Component {
  /**
   * @type {Object}
   * @property {String} apiKey - Google provides this in their console
   * @property {google~MapOptions} options - Options passed when map is initialised
   */
  static propTypes = {
    apiKey: PropTypes.string.isRequired,
    options: PropTypes.object.isRequired,
  };

  /**
   * @ignore
   */
  constructor(props) {
    super(props);

    /**
     * @ignore
     */
    this.$map = React.createRef();
  }

  /**
   * @ignore
   */
  componentDidMount() {
    const { apiKey, options } = this.props;
    /**
     * @ignore
     */
    this.google = new GoogleMapModel(apiKey, this.$map.current, options);
  }

  /**
   * @ignore
   */
  render() {
    return (
      <section className='googlemap'>
        <div className='googlemap__map' ref={this.$map} />
      </section>
    );
  }
}

export default GoogleMap;
