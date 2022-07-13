import Api from "../index";

const qs = require('qs');

const getArticlesPinHome = async () => {
  const query = qs.stringify({
    "filters": {
      "pin_home": "1"
    },
    "populate": "*"
  }, {
    encodeValuesOnly: true
  });
  const url = `/api/articles?${query}`;
  return await Api.get(url);
}

const getArticlesByCategoryId = async (categoryId) => {
  const query = qs.stringify({
    "filters": {
      "category": categoryId
    },
    "populate": "*"
  }, {
    encodeValuesOnly: true
  });
  const url = `/api/articles?${query}`;
  return await Api.get(url);
}

const getArticleDetail = async (slug: string) => {
  const query = qs.stringify({
    "filters": {
      "slug": slug
    },
    "populate": {
      "0":"biz_listings.biz_listings",
      "1":"biz_listings.biz_listings.reviews",
      "2":"biz_listings.biz_listings.tags",
      "3":"biz_listings.biz_listings.user_listing_follows",
      "4":"category",
      "5":"related_articles.thumbnail",
      "6":"thumbnail",
    }
  }, {
    encodeValuesOnly: true
  });
  const url = `/api/articles?${query}`;
  return await Api.get(url);
}

export default {
  getArticleDetail,
  getArticlesPinHome,
  getArticlesByCategoryId
}
