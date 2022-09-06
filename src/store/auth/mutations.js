export function UPDATE_TOKEN (state, accessToken) {
  state.accessToken = accessToken
}
export function DESTROY_TOKEN (state) {
  state.accessToken = null
}
