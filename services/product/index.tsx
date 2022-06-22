import Api from "../index";

const qs = require('qs');

const getProductsByBizListingId = async (bizListingId: any) => {
  const query = qs.stringify({
    "filters": {
      "biz_listing": {
        "id": bizListingId
      }
    }
  }, {
    encodeValuesOnly: true
  });

  const url = `/api/products?${query}`;
  return await Api.get(url);
}

const createProduct = async (params: any) => {
  const url = `/api/products`;
  return await Api.post(url, {
    data: params
  });
}

const deleteProduct = async (productId: any) => {
  const url = `/api/products/${productId}`;
  return await Api.delete(url);
}

export default {
  getProductsByBizListingId,
  createProduct,
  deleteProduct
}
