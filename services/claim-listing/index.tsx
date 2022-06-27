import Api from "../index";

const qs = require('qs');

const createClaimListing = async (params: any) => {
  const url = `/api/claim-listings`;
  return await Api.post(url, {
    data: {
        user: localStorage.getItem('user_id'),
        payment_method: params.paymentMethod,
        transaction_id: params.transaction_id,
        biz_listings: localStorage.getItem('biz_id'),
        publishedAt: null
      }
  });
}

const getClaimListingByUserId = async (userId: any) => {
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

  const url = `/api/claim-listings?${query}`;
  return await Api.get(url);
}
  

export default {
  createClaimListing,
  getClaimListingByUserId
}
  