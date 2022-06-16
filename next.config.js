/** @type {import('next').NextConfig} */


module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos', 'bamboohealth.s3.ap-southeast-1.amazonaws.com'],
  },
  i18n: {
    locales: ['en', 'sg'],
    defaultLocale: 'en',
  },
}