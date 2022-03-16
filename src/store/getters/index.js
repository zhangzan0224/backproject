export default {
  roles () {
    return JSON.parse(localStorage.getItem('user'))?.roles || [];
  }
};
