import Api from "../index";

const qs = require('qs');

const getBanner = async () => {
  const url = `/api/banners/get-banner-custom`
  return await Api.get(url)
}

const getBannerByCategory = async (category) => {
    const url = `/api/banners/get-banner-by-category?category=${category}`
    return await Api.get(url)
}
  

export default {
    getBanner,
    getBannerByCategory
}
