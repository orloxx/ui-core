export default class StringUtils {
  static serialize(obj) {
    return Object.keys(obj)
      .map(p => `${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`)
      .join('&');
  }
}
