class LocalStorageManager {
  static getAccessToken = () => {
    return localStorage.getItem('accessToken');
  };

  static setAccessToken = accessToken => {
    localStorage.setItem('accessToken', accessToken);
  };

  static setSelectedKlass = selectedKlass => {
    localStorage.setItem('selectedKlass', JSON.stringify(selectedKlass));
  };

  static getSelectedKlass = () => {
    return JSON.parse(localStorage.getItem('selectedKlass'));
  };

  static clearAccessToken = () => {
    localStorage.clear();
  };

  static setUser = user => {
    localStorage.setItem('user', user);
  };

  static getUser = () => {
    return localStorage.getItem('user');
  }
}

export default LocalStorageManager;