import { Categories } from "enums";
import category from "services/category";
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
      },
      "listing_roles": {
        "data": [
          "id",
          "attributes"
        ]
      },
      "claim_listings": {
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

const getBizListingsByCategoryId = async (categoryId: Categories, page: number) => {
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
      },
      "listing_roles": {
        "data": [
          "id",
          "attributes"
        ]
      },
      "claim_listings": {
        "data": [
          "id",
          "attributes"
        ]
      }
    }
  }, {
    encodeValuesOnly: true, // prettify url
  });

  const url = `/api/biz-listings?${query}&pagination[page]=${page}&pagination[pageSize]=28`;
  return await Api.get(url);
}

const getBizListingByUserId = async (userId: number) => {
  const query = qs.stringify({
    "filters": {
      "user": {
        "id": {
          "$eq": userId
        }
      }    
    },
    "populate": "*"
  }, {
    encodeValuesOnly: true, 
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
  let userInfo = JSON.parse(localStorage.getItem("user") || '{}')
  return await Api.post(url, {
    data: {
      user: userInfo.id,
      biz_listing: params.bizListingId,
      name: params.name
    }
  });
}

const getOwnerListingRoleByUserId = async (userId: any) => {
  const query = qs.stringify({
    "filters": {
      "name": "Owner",
      "user": {
        "id": {
          "$eq": userId
        }
      }    
    },
    "populate": "*"
  }, {
    encodeValuesOnly: true, 
  });

  const url = `/api/listing-roles?${query}`;
  return await Api.get(url);
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

const getInfoBizListingBySlug = async (bizListingSlug: any) => {
  const url = `/api/biz-listings/bizlisting-information/?slug=${bizListingSlug}`
  return await Api.get(url)
}

const getOwnerBizListingBySlug = async (bizListingSlug: any) => {
  let userInfo = JSON.parse(localStorage.getItem("user") || '{}')
  const query = qs.stringify({
    "filters": {
      "slug": bizListingSlug,
      $or: [
        {
          "claim_listings": {
            "user": {
              "id": {
                "$eq": userInfo.id
              }
            }  
          }
        },
        {
          "listing_roles": {
            "name": "Owner",
            "user": {
              "id": {
                "$eq": userInfo.id
              }
            } 
          }
        }
      ] 
    },
    "populate": "*"
  }, {
    encodeValuesOnly: true
  });

  const url = `/api/biz-listings?${query}`;
  return await Api.get(url);
}

const getInfoOwnerBizListingBySlug = async (bizListingSlug: any) => {
  let userInfo = JSON.parse(localStorage.getItem("user") || '{}')
  const url = `/api/biz-listings/owner-bizlisting-information/?slug=${bizListingSlug}&userId=${userInfo.id}`
  return await Api.get(url)
}

const getOwnerBizListing = async (bizListingSlug: any) => {
  let userInfo = JSON.parse(localStorage.getItem("user") || '{}')
  const query = qs.stringify({
    "filters": {
      $or: [
        {
          "claim_listings": {
            "user": {
              "id": {
                "$eq": userInfo.id
              }
            }  
          }
        },
        {
          "listing_roles": {
            "name": "Owner",
            "user": {
              "id": {
                "$eq": userInfo.id
              }
            } 
          }
        }
      ] 
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

const checkListingHaveOwner = async (bizListingSlug: any) => {
  let userInfo = JSON.parse(localStorage.getItem("user") || '{}')
  const query = qs.stringify({
    "filters": {
      "slug": bizListingSlug,
      "listing_roles": {
        "name": "Owner"
      }
    },
    "populate": "*"
  }, {
    encodeValuesOnly: true
  });

  const url = `/api/biz-listings?${query}`;
  return await Api.get(url);
}

const getBizListingForYou = async (limit) => {
  let userInfo = JSON.parse(localStorage.getItem("user") || '{}')
  if (userInfo.id) {
    const url = `/api/biz-listings/bizlisting-for-you/?userId=${userInfo.id}&limit=${limit}`
    return await Api.get(url)
  }
}

const getAllBizListingsByCategory = async () => {
    const url = `/api/biz-listings/bizlisting-by-category/`
    return await Api.get(url)
}

const getAllBizListingsHaveExclusiveDeal = async () => {
  const url = `/api/biz-listings/exclusive-deal/`
  return await Api.get(url)
}

const getExclusiveDealByCategory = async (category) => {
  const url = `/api/biz-listings/exclusive-deal-by-category/?category=${category}`
  return await Api.get(url)
}

const getBizlistingByCategoryLink = async (category, categoryLinks, page) => {
  const url = `/api/biz-listings/bizlisting-by-categorylink?category=${category}&categoryLinks=${categoryLinks}&page=${page}`
  return await Api.get(url)
}

const getListingFavouriteByCategory = async (category) => {
  let userInfo = JSON.parse(localStorage.getItem("user") || '{}')
  const url = `/api/biz-listings/listing-favourite-by-category?category=${category}&userId=${userInfo.id}`;
	return await Api.get(url);
}

export default {
  getBizlistingByCategoryLink,
  getBizListing,
  getOwnerListingRoleByUserId,
  getInfoOwnerBizListingBySlug,
  getBizListingByUserId,
  getBizListingsByCategoryId,
  getBizListingById,
  createListingRole,
  getBizListingBySlug,
  getInfoBizListingBySlug,
  getOwnerBizListingBySlug,
  getOwnerBizListing,
  updateBizListing,
  createBizListing,
  getBizListingReviews,
  getBizListingCountries,
  getBizListingByCountry,
  checkListingHaveOwner,
  getBizListingForYou,
  getAllBizListingsByCategory,
  getAllBizListingsHaveExclusiveDeal,
  getExclusiveDealByCategory,
  getListingFavouriteByCategory
}
