/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgo: false, // disable svgo optimizations
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
