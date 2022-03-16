export default {
  SET_SECOND_AND_THIRD_MENU (state, secondAndThirdMenu) {
    // console.log(secondAndThirdMenu)
    state.secondAndThirdMenu = secondAndThirdMenu;
    localStorage.setItem(
      'secondandthree',
      JSON.stringify(state.secondAndThirdMenu)
    );
  },
  SET_MENU (state, menu) {
    state.menu = menu;
  }
};
