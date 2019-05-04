import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMapModel from './google-map.model';

/**
 * Controls a map initialised with the Google Maps JavaScript API
 *
 * @see https://developers.google.com/maps/documentation/javascript/tutorial
 *
 * @example
 * <GoogleMap
 *   apiKey='your-google-api-key'
 *   options={{ center: { lat: 10.4657, lng: -66.8796 }, zoom: 12 }} />
 */
class GoogleMap extends Component {
  /**
   * @type {Object}
   * @property {String} apiKey - Google provides this in their console
   * @property {google~MapOptions} options - Options passed when map is initialised
   * @property {Function} [onDragend] - Triggers when user finishes dragging map
   * @property {Function} [onDragend] - Triggers when zoom changes
   */
  static propTypes = {
    apiKey: PropTypes.string.isRequired,
    options: PropTypes.object.isRequired,
    onDragend: PropTypes.func,
    onZoomChanged: PropTypes.func,
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
    this.google.initGoogleMap().then(this.addMapListeners.bind(this));
  }

  /**
   * @ignore
   */
  addMapListeners(map) {
    const { onDragend, onZoomChanged } = this.props;
    if (onDragend) {
      map.addListener('dragend', onDragend.bind(this, map));
    }
    if (onZoomChanged) {
      map.addListener('zoom_changed', onZoomChanged.bind(this, map));
    }
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
