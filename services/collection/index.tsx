import Api from "../index";

const qs = require('qs');

const getCollection = async () => {
  const url = `/api/collections/get-collection-custom`
  return await Api.get(url)
}

const getCollectionByCategory = async (category) => {
    const url = `/api/collections/get-collection-by-category?category=${category}`
    return await Api.get(url)
}
  

export default {
    getCollection,
    getCollectionByCategory
}
