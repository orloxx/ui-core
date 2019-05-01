export default class ImageUtils {
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
