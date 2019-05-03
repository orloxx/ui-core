import { StringUtils } from '../../utils';

/**
 * @external {google~Map} https://developers.google.com/maps/documentation/javascript/reference/map
 */

/**
 * @external {google~LatLng} https://developers.google.com/maps/documentation/javascript/reference/coordinates
 */

/**
 * @external {google~MapOptions} https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions
 *
 * @example
 * { center: { lat: 10.4657, lng: -66.8796 }, zoom: 12 }
 */

/**
 * @external {Element} https://developer.mozilla.org/en-US/docs/Web/API/Element
 */

/**
 * Controls communication and handling of the Google Maps JavaScript API
 *
 * @example
 * const googleMap = new GoogleMapModel(
 *   'your-google-api-key',
 *   document.getElementById('some-map'),
 *   { center: { lat: 10.4657, lng: -66.8796 }, zoom: 12 }
 * );
 */
class GoogleMapModel {
  /**
   * Initialises the map using Google Maps JavaScript API
   *
   * @param {String} apiKey - Google provides this in their console
   * @param {Element} $el - The element where the map will be rendered
   * @param {google~MapOptions} options - Google Maps options
   */
  constructor(apiKey, $el, options) {
    /**
     * Google's API key
     * @type {String}
     */
    this.apiKey = apiKey;
    /**
     * The element where the map will be rendered
     * @type {Element}
     */
    this.$el = $el;
    /**
     * Google Maps options
     * @type {google~MapOptions}
     */
    this.options = options;
    /**
     * The map instance from Google Maps JavaScript API
     * @type {google~Map}
     */
    this.map = null;
  }

  /**
   * The callback name attached to the Google's script library
   *
   * @return {String}
   */
  static get INIT_CALLBACK() {
    return 'initGoogleMapsLib';
  }

  /**
   * The callback name triggered when the Google's script library is called
   *
   * @return {String}
   */
  static get READY_CALLBACK() {
    return 'googleMapsLibReady';
  }

  /**
   * Initialises the Google Maps JavaScript library and safely calls {@link renderMap}
   *
   * There are three ways this can go down:
   *
   * 1. It's the first map added to the page and the script library has not been included yet
   * 2. The library was included and INIT_CALLBACK already triggered
   * 3. The library was included but it has not initialised yet
   *
   * @return {Promise<google~Map>}
   */
  initGoogleMap() {
    return new Promise((resolve) => {
      if (!window[GoogleMapModel.INIT_CALLBACK]) {
        window[GoogleMapModel.INIT_CALLBACK] = () => {
          const initEvent = new Event(GoogleMapModel.READY_CALLBACK);
          document.dispatchEvent(initEvent);
          window[GoogleMapModel.READY_CALLBACK] = true;
          resolve(this.renderMap());
        };
        const API_URL = 'https://maps.googleapis.com/maps/api/js';
        const libScript = document.createElement('script');
        const params = {
          key: this.apiKey,
          callback: GoogleMapModel.INIT_CALLBACK,
        };
        libScript.async = true;
        libScript.defer = true;
        libScript.src = `${API_URL}?${StringUtils.serialize(params)}`;
        document.body.appendChild(libScript);
      } else if (window[GoogleMapModel.READY_CALLBACK] === true) {
        // Library is ready and event was already called
        resolve(this.renderMap());
      } else {
        // Library was defined but not ready yet
        document.addEventListener(GoogleMapModel.READY_CALLBACK, () => {
          resolve(this.renderMap());
        });
      }
    });
  }

  /**
   * Renders the map in the chosen {@link $el}
   *
   * @return {google~Map}
   */
  renderMap() {
    this.map = new window.google.maps.Map(this.$el, Object.assign({
      clickableIcons: false,
      center: { lat: 10.4657, lng: -66.8796 },
      zoom: 12,
    }, this.options));
    return this.map;
  }
}

export default GoogleMapModel;
