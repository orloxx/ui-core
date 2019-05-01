/**
 * @external {File} https://developer.mozilla.org/en-US/docs/Web/API/File
 */

/**
 * Image utilities
 */
class ImageUtils {
  /**
   * Promise that reads an image file and returns the file data when finished
   *
   * @param {File} file
   * @return {Promise<String>}
   */
  static getFileData(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener('load', ({ target }) => {
        resolve(target.result !== 'data:' ? target.result : null);
      });
      reader.addEventListener('error', error => reject(error));
      reader.readAsDataURL(file);
    });
  }
}

export default ImageUtils;
