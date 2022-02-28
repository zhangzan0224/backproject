export default {
  SET_SECOND_AND_THIRD_MENU (state, secondAndThirdMenu) {
    // console.log(secondAndThirdMenu)
    state.secondAndThirdMenu = secondAndThirdMenu
    localStorage.setItem('menu', JSON.stringify(state.secondAndThirdMenu))
  }
}
