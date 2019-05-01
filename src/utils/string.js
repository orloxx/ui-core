/**
 * String utilities
 */
class StringUtils {
  /**
   * Takes an object and converts it into a query string
   * @param {Object} obj
   * @return {string}
   */
  static serialize(obj) {
    return Object.keys(obj)
      .map(p => `${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`)
      .join('&');
  }
}

export default StringUtils;
