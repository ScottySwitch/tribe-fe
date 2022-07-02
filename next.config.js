/** @type {import('next').NextConfig} */


module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['meeko-cms.thewandergroup.com.sg', 'picsum.photos', 'bamboohealth.s3.ap-southeast-1.amazonaws.com',
      'platform-lookaside.fbsbx.com', 'lh3.googleusercontent.com', 'ep-test-quyen.s3.ap-southeast-1.amazonaws.com'
    ],
  },
  i18n: {
    locales: ['en', 'sg'],
    defaultLocale: 'en',
  },
}
