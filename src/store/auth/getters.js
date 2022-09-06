export function loggedIn (state) {
  return state.accessToken !== null
}
export function accessToken (state) {
  return state.accessToken
}
