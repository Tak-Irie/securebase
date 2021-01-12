const { createSecureHeaders } = require('next-secure-headers');

module.exports = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  async headers() {
    return [{ source: '/(.*)', headers: createSecureHeaders() }];
  },
};
