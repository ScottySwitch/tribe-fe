import Api from "../index";
const qs = require('qs');

const getProductTypeByCategoryLinkId = async (categoryLinkId: any) => {
  const query = qs.stringify({
    "filters": {
      "category_links": {
        "id": categoryLinkId
      }
    },
    "pagination": {
      "limit": 500
    }
  }, {
    encodeValuesOnly: true
  });

  const url = `/api/product-types?${query}`;
  return await Api.get(url);
}

const getProductTypeByCategoryLinkSlug = async (categoryLinkSlug?: string) => {
  const query = qs.stringify(
    {
      filters: {
        category_links: { value: categoryLinkSlug },
      },
      pagination: {
        limit: 500,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const url = `/api/product-types?${query}`;
  return await Api.get(url);
};

const getProductTypeByCategoryId = async (categoryId: any) => {
  const query = qs.stringify({
    "filters": {
      "category_id": categoryId
    },
    "pagination": {
      "limit": 500
    }
  }, {
    encodeValuesOnly: true
  });

  const url = `/api/product-types?${query}`;
  return await Api.get(url);
}


export default {
  getProductTypeByCategoryLinkSlug,
  getProductTypeByCategoryLinkId,
  getProductTypeByCategoryId
}
