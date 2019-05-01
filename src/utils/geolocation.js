/**
 * @external {Position} https://developer.mozilla.org/en-US/docs/Web/API/Position
 */
/**
 * @external {PositionError} https://developer.mozilla.org/en-US/docs/Web/API/PositionError
 */
/**
 * Geolocation utilities
 */
class GeolocationUtils {
  /**
   * Registers a handler function that will be called automatically each time
   * the position of the device changes. You can also, optionally, specify an
   * error handling callback function.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/watchPosition
   *
   * @param {Function} callback - Takes a {@link Position} object as an input parameter.
   * @param {Function} errorCallback - Takes a {@link PositionError} object as an input parameter.
   * @return {number} - A watch ID value that then can be used to unregister
   * the handler using {@link GeolocationUtils.disable}
   */
  static enable(callback, errorCallback) {
    return navigator.geolocation.watchPosition(callback, errorCallback);
  }

  /**
   * Gets the current position of the device.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
   *
   * @param {Function} callback - Takes a {@link Position} object as an input parameter.
   * @param {Function} errorCallback - Takes a {@link PositionError} object as an input parameter.
   */
  static getCurrent(callback, errorCallback) {
    navigator.geolocation.getCurrentPosition(callback, errorCallback);
  }

  /**
   * unregister location/error monitoring handlers previously installed
   * using {@link GeolocationUtils.enable}
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/clearWatch
   *
   * @param {number} watcher - Watch ID value returned by {@link GeolocationUtils.enable}
   */
  static disable(watcher) {
    navigator.geolocation.clearWatch(watcher);
  }

  /**
   * @ignore
   */
  static deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  /**
   * @ignore
   */
  static forceFloat(value) {
    if (typeof value === 'string') {
      return parseFloat(value);
    }
    return value;
  }

  /**
   * Calculates the distance between two points on Earth
   *
   * @param {number} lat1 - Point's A latitude
   * @param {number} lng1 - Point's A longitude
   * @param {number} lat2 - Point's B latitude
   * @param {number} lng2 - Point's B longitude
   * @return {number} - The distance in meters
   */
  static distance(lat1, lng1, lat2, lng2) {
    const fLat1 = GeolocationUtils.forceFloat(lat1);
    const fLng1 = GeolocationUtils.forceFloat(lng1);
    const fLat2 = GeolocationUtils.forceFloat(lat2);
    const fLng2 = GeolocationUtils.forceFloat(lng2);
    // Radius is in meters
    const earthRadius = 6371000;
    const dLat = GeolocationUtils.deg2rad(fLat2 - fLat1);
    const dLng = GeolocationUtils.deg2rad(fLng2 - fLng1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(GeolocationUtils.deg2rad(fLat1)) *
      Math.cos(GeolocationUtils.deg2rad(fLat2)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(earthRadius * c);
  }
}

export default GeolocationUtils;
