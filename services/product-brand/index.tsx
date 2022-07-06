import Api from "../index";

const qs = require('qs');

const getProductBrandByProductTypeId = async (productTypeIds: []) => {
  const query = qs.stringify({
    "filters": {
      "product_types": {
        "id": {
          "$in": productTypeIds
        }
      }
    },
    "pagination": {
      "limit": 500
    }
  }, {
    encodeValuesOnly: true
  });

  const url = `/api/product-brands?${query}`;
  return await Api.get(url);
}


export default {
  getProductBrandByProductTypeId
}
