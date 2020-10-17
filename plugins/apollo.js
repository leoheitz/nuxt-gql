export default function ({ store, app, env }) {
  const client = app.apolloProvider.defaultClient

  console.log('store', store)
  client.wsClient.lazy = true

  client.wsClient.connectionParams = () => {
    return {
      headers: {
        'X-Parse-Application-Id': env.X_PARSE_APP_ID,
        'X-Parse-Client-Key': env.X_PARSE_CLIENT_KEY,
        'X-Parse-Session-Token': store.$auth.getToken('local'),
      },
    }
  }
}
