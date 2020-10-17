export default ({ store, $axios, env }) => {
  $axios.onRequest((config) => {
    const token = store.$auth.getToken('local')

    $axios.setHeader('X-Parse-Application-Id', env.X_PARSE_APP_ID)
    $axios.setHeader('X-Parse-Client-Key', env.X_PARSE_CLIENT_KEY)
    $axios.setHeader('X-Parse-Session-Token', token)
  })
}
