import Api from "../index";

const qs = require('qs');

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
  createProduct,
  deleteProduct
}
