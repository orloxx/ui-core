import { StringUtils } from '../../utils';

/**
 * Controls communication and handling of the Google Maps API
 */
class GoogleMapModel {
  constructor(apiKey, $el) {
    this.apiKey = apiKey;
    this.$el = $el;
    this.renderMap = this.renderMap.bind(this);
    this.initGoogleMap();
  }

  static get INIT_CALLBACK() {
    return 'initGoogleMapsLib';
  }

  static get READY_CALLBACK() {
    return 'googleMapsLibReady';
  }

  initGoogleMap() {
    if (!window[GoogleMapModel.INIT_CALLBACK]) {
      window[GoogleMapModel.INIT_CALLBACK] = () => {
        const initEvent = new Event(GoogleMapModel.READY_CALLBACK);
        document.dispatchEvent(initEvent);
        window[GoogleMapModel.READY_CALLBACK] = true;
        this.renderMap();
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
      this.renderMap();
    } else {
      // Library was defined but not ready yet
      document.addEventListener(GoogleMapModel.READY_CALLBACK, this.renderMap);
    }
  }

  renderMap() {
    document.removeEventListener(GoogleMapModel.READY_CALLBACK, this.renderMap);
    this.map = new window.google.maps.Map(this.$el, {
      clickableIcons: false,
      center: { lat: 0, lng: 0 },
      zoom: 10,
    });
  }
}

export default GoogleMapModel;
