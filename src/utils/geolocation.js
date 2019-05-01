export default class GeolocationUtils {
  static enable(callback, errorCallback) {
    return navigator.geolocation.watchPosition(callback, errorCallback);
  }

  static getCurrent(callback, errorCallback) {
    return navigator.geolocation.getCurrentPosition(callback, errorCallback);
  }

  static disable(watcher) {
    return navigator.geolocation.clearWatch(watcher);
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
