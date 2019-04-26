export const enable = (callback, errorCallback) => navigator.geolocation
  .watchPosition(callback, errorCallback);

export const getCurrent = (callback, errorCallback) => navigator.geolocation
  .getCurrentPosition(callback, errorCallback);

export const disable = watcher => navigator.geolocation.clearWatch(watcher);

const deg2rad = deg => deg * (Math.PI / 180);

const forceFloat = (value) => {
  if (typeof value === 'string') {
    return parseFloat(value);
  }
  return value;
};

export const distance = (lat1, lng1, lat2, lng2) => {
  const fLat1 = forceFloat(lat1);
  const fLng1 = forceFloat(lng1);
  const fLat2 = forceFloat(lat2);
  const fLng2 = forceFloat(lng2);
  // Radius is in meters
  const earthRadius = 6371000;
  const dLat = deg2rad(fLat2 - fLat1);
  const dLng = deg2rad(fLng2 - fLng1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(fLat1)) *
    Math.cos(deg2rad(fLat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(earthRadius * c);
};
