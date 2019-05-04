import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMapModel from './google-map.model';

/**
 * Controls a map initialised with the Google Maps JavaScript API
 *
 * #### SCSS import:
 * ```
 * @import "~@orloxx/ui-core/scss/google-map";
 * ```
 *
 * @see https://developers.google.com/maps/documentation/javascript/tutorial
 *
 * @example
 * const mapOptions = { center: { lat: 10.4657, lng: -66.8796 }, zoom: 10 };
 * const onMapReady = (map) => {
 *   // Handles map
 * };
 *
 * @example
 * <GoogleMap
 *   apiKey='your-google-api-key'
 *   options={mapOptions}
 *   onInit={map => onMapReady(map)} />
 */
class GoogleMap extends Component {
  /**
   * @type {Object}
   * @property {String} apiKey - Google provides this in their console
   * @property {google~MapOptions} options - Options passed when map is initialised
   * @property {Function} [onInit] - Triggers when the map is ready and rendered
   *
   * @property {Function} [onBoundsChanged] - Triggers when the viewport bounds have changed.
   * @property {Function} [onCenterChanged] - Triggers when the map center property changes.
   * @property {Function} [onClick] - Triggers when the user clicks on the map.
   *   An ApiMouseEvent with properties for the clicked location is returned unless a place
   *   icon was clicked, in which case an IconMouseEvent with a placeid is returned.
   *   IconMouseEvent and ApiMouseEvent are identical, except that IconMouseEvent has the
   *   placeid field. The event can always be treated as an ApiMouseEvent when the placeid
   *   is not important. The click event is not fired if a marker or infowindow was clicked.
   * @property {Function} [onDoubleClick] - Triggers when the user double-clicks on the map.
   *   Note that the click event will also fire, right before this one.
   * @property {Function} [onDrag] - This event is repeatedly fired while the user drags the map.
   * @property {Function} [onDragEnd] - Triggers when the user stops dragging the map.
   * @property {Function} [onDragStart] - Triggers when the user starts dragging the map.
   * @property {Function} [onHeadingChanged] - Triggers when the map heading property changes.
   * @property {Function} [onIdle] - Triggers when the map becomes idle after panning or zooming.
   * @property {Function} [onMapTypeIdChanged] - Triggers when the mapTypeId property changes.
   * @property {Function} [onMouseMove] - Triggers whenever the user's mouse moves over the map container.
   * @property {Function} [onMouseOut] - Triggers when the user's mouse exits the map container.
   * @property {Function} [OnMouseOver] - Triggers when the user's mouse enters the map container.
   * @property {Function} [onProjectionChanged] - Triggers when the projection has changed.
   * @property {Function} [onRightClick] - Triggers when the DOM contextmenu event is fired on the map container.
   * @property {Function} [onTilesLoaded] - Triggers when the visible tiles have finished loading.
   * @property {Function} [onTiltChanged] - Triggers when the map tilt property changes.
   * @property {Function} [onZoomChanged] - Triggers when the map zoom property changes.
   */
  static propTypes = {
    apiKey: PropTypes.string.isRequired,
    options: PropTypes.object.isRequired,
    onInit: PropTypes.func,
    onBoundsChanged: PropTypes.func,
    onCenterChanged: PropTypes.func,
    onClick: PropTypes.func,
    onDoubleClick: PropTypes.func,
    onDrag: PropTypes.func,
    onDragEnd: PropTypes.func,
    onDragStart: PropTypes.func,
    onHeadingChanged: PropTypes.func,
    onIdle: PropTypes.func,
    onMapTypeIdChanged: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseOut: PropTypes.func,
    OnMouseOver: PropTypes.func,
    onProjectionChanged: PropTypes.func,
    onRightClick: PropTypes.func,
    onTilesLoaded: PropTypes.func,
    onTiltChanged: PropTypes.func,
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
    const { onInit } = this.props;
    if (onInit) {
      onInit(map);
    }
    this.google.addListener('bounds_changed', this.props.onBoundsChanged);
    this.google.addListener('center_changed', this.props.onCenterChanged);
    this.google.addListener('click', this.props.onClick);
    this.google.addListener('dblclick', this.props.onDoubleClick);
    this.google.addListener('drag', this.props.onDrag);
    this.google.addListener('dragend', this.props.onDragEnd);
    this.google.addListener('dragstart', this.props.onDragStart);
    this.google.addListener('heading_changed', this.props.onHeadingChanged);
    this.google.addListener('idle', this.props.onIdle);
    this.google.addListener('maptypeid_changed', this.props.onMapTypeIdChanged);
    this.google.addListener('mousemove', this.props.onMouseMove);
    this.google.addListener('mouseout', this.props.onMouseOut);
    this.google.addListener('mouseover', this.props.OnMouseOver);
    this.google.addListener('projection_changed', this.props.onProjectionChanged);
    this.google.addListener('rightclick', this.props.onRightClick);
    this.google.addListener('tilesloaded', this.props.onTilesLoaded);
    this.google.addListener('tilt_changed', this.props.onTiltChanged);
    this.google.addListener('zoom_changed', this.props.onZoomChanged);
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
