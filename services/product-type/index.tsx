import Api from "../index";
const qs = require('qs');

const getProductTypeByCategoryLinkId = async (categoryLinkId: any) => {
  const query = qs.stringify({
    "filters": {
      "category_link": {
        "id": categoryLinkId
      }
    }
  }, {
    encodeValuesOnly: true
  });

  const url = `/api/product-types?${query}`;
  return await Api.get(url);
}


export default {
  getProductTypeByCategoryLinkId
}
