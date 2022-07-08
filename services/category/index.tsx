import Api from "../index";

const getCategories = async () => {
  const url = `/api/categories?sort=order`;
  return await Api.get(url);
}

const getListCategory = async () => {
  const url = `/api/categories/list-category`
  return await Api.get(url)
}

export default {
  getCategories
}
