import Api from "../index";

const qs = require('qs');

const getArticleCustomer = async (data: any) => {
  let filter: any = {};
  let pagination: any = {};
  if (data?.categories) {
    filter = {
      ...filter,
      category: {
        slug: data.categories,
      },
    };
  }

  if (data?.limit) {
    pagination.pageSize = data.limit;
  }
  if (data?.page) {
    pagination.page = data.page;
  }

  const params = {
    filters: {
      ...filter,
    },
    pagination: {
      ...pagination,
    },
    populate: {
      thumbnail: {
        url: true,
      },
    },
  };
  const query = qs.stringify(params, {
    encodeValuesOnly: true, // prettify url
  });
  const url = `/api/articles/?${query}`;
  return await Api.get(url);
};

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

const ArticleApi = 
{
  getArticleCustomer,
  getArticleDetail,
  getArticlesPinHome,
  getArticlesByCategoryId
}

export default ArticleApi