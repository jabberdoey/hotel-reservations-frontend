module.exports = {
  async redirects() {
    return [
      // Basic redirect
      {
        source: '/',
        destination: '/check-in',
        permanent: true,
      },
    ]
  },
}