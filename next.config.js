/** @type {import('next').NextConfig} */


module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['meeko-cms.thewandergroup.com.sg', 'picsum.photos', 'bamboohealth.s3.ap-southeast-1.amazonaws.com',
      'platform-lookaside.fbsbx.com', 'lh3.googleusercontent.com', 'tribes-be.s3.ap-southeast-1.amazonaws.com', 'res.klook.com'
    ],
  },
  i18n: {
    locales: ['en', 'id', 'sg'],
    defaultLocale: 'en',
  },
}