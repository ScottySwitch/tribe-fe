import Api from "../index";

const qs = require('qs');

const getReviewsByBizListingSlug = async (bizListingSlug: any) => {
  const query = qs.stringify({
    "filters": {
      "biz_listing": {
        "slug": bizListingSlug
      }
    },
    "populate": {
      "biz_listing": {
        "fields": [
          "id"
        ]
      },
      "user": "*"
    }
  }, {
    encodeValuesOnly: true
  });

  const url = `/api/reviews?${query}`;
  return await Api.get(url);
}

const addReview = async (params: any) => {
  const url = `/api/reviews`;
  return await Api.post(url, {
    data: params
  });
}

const getReviewsByBizListingSlugWithSort = async (bizListingSlug: any, sortBy: string) => {
  let dataSend: any = {
    "filters": {
      "biz_listing": {
        "slug": bizListingSlug
      }
    },
    "populate": {
      "biz_listing": {
        "fields": [
          "id"
        ]
      },
      "user": "*"
    }
  }
  if (sortBy !== '') {
    dataSend = {...dataSend, "sort": [sortBy]}
  }
  const query = qs.stringify(dataSend, {
    encodeValuesOnly: true
  });

  const url = `/api/reviews?${query}`;
  return await Api.get(url);
}


export default {
  getReviewsByBizListingSlug,
  addReview,
  getReviewsByBizListingSlugWithSort
}
