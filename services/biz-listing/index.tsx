import Api from "../index";

const qs = require('qs');

const getBizListing = async () => {
  const query = qs.stringify({
    "populate": {
      "user_listing_follows": {
        "fields": [
          "id"
        ]
      },
      "reviews": {
        "fields": [
          "id"
        ]
      },
      "categories": {
        "data": [
          "id",
          "attributes"
        ]
      }
    }
  }, {
    encodeValuesOnly: true, // prettify url
  });
  const url = `/api/biz-listings?${query}`;
  return await Api.get(url);
}

const getBizListingsByCategoryId = async (categoryId: number) => {
  const query = qs.stringify({
    "filters": {
      "categories": {
        "id": {
          "$eq": categoryId
        }
      }
    },
    "populate": {
      "user_listing_follows": {
        "fields": [
          "id"
        ]
      },
      "reviews": {
        "fields": [
          "id"
        ]
      }
    }
  }, {
    encodeValuesOnly: true, // prettify url
  });

  const url = `/api/biz-listings?${query}`;
  return await Api.get(url);
}

const getBizListingById = async (bizListingId: any) => {
  const query = qs.stringify({
    "populate": {
      "user_listing_follows": {
        "fields": [
          "id"
        ]
      },
      "reviews": {
        "fields": [
          "id"
        ]
      }
    }
  }, {
    encodeValuesOnly: true, // prettify url
  });

  const url = `/api/biz-listings/${bizListingId}?${query}`;
  return await Api.get(url);
}

const createListingRole = async (params: any) => {
  const url = `/api/listing-roles`;
  return await Api.post(url, {
    data: {
      user: localStorage.getItem('user_id'),
      biz_listing: params.bizListingId,
      name: params.name
    }
  });
}

const getBizListingBySlug = async (bizListingSlug: any) => {
  const query = qs.stringify({
    "filters": {
      "slug": bizListingSlug
    },
    "populate": "*"
  }, {
    encodeValuesOnly: true
  });

  const url = `/api/biz-listings?${query}`;
  return await Api.get(url);
}

const updateBizListing = async (bizListingId: number, params: any) => {
  const url = `/api/biz-listings/${bizListingId}`;
  return await Api.put(url, {
    data: params
  });
}

const createBizListing = async (params: any) => {
  const url = `/api/biz-listings/`;
  return await Api.post(url, {
    data: params
  });
}

const getBizListingReviews = async (bizListingSlug: any) => {
  const query = qs.stringify({
    "filters": {
      "slug": bizListingSlug
    },
    "populate": {
      "reviews": {
        "populate": [
          "user"
        ]
      }
    }
  }, {
    encodeValuesOnly: true
  });
  const url = `/api/biz-listings?${query}`;
  return await Api.get(url);
}

const getBizListingCountries = async () => {
  const url = `/api/biz-listings/countries`;
  return await Api.get(url);
}

const getBizListingByCountry = async (country: string) => {
  const query = qs.stringify({
    "filters": {
      "country": country
    },
    "populate": {
      "reviews": {
        "populate": [
          "user"
        ]
      }
    }
  }, {
    encodeValuesOnly: true
  });
  const url = `/api/biz-listings?${query}`;
  return await Api.get(url);
}

export default {
  getBizListing,
  getBizListingsByCategoryId,
  getBizListingById,
  createListingRole,
  getBizListingBySlug,
  updateBizListing,
  createBizListing,
  getBizListingReviews,
  getBizListingCountries,
  getBizListingByCountry
}
