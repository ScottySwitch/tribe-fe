import Api from "../index";

const getCategories = async () => {
  const url = `/api/categories`;
  return await Api.get(url);
}


export default {
  getCategories
}
