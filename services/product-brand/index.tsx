import Api from "../index";

const qs = require('qs');

const getProductBrandByProductTypeId = async (productTypeIds: []) => {
  const query = qs.stringify({
    "filters": {
      "product_type": {
        "id": {
          "$in": productTypeIds
        }
      }
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
