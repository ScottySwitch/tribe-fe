/** @type {import('next').NextConfig} */


module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos', 'bamboohealth.s3.ap-southeast-1.amazonaws.com',
      'platform-lookaside.fbsbx.com', 'lh3.googleusercontent.com', "https://meeko-cms.thewandergroup.com.sg/"
    ],
  },
  i18n: {
    locales: ['en', 'sg'],
    defaultLocale: 'en',
  },
}