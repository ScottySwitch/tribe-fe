import Api from "../index";

const qs = require("qs");

const getPromotionBySlug = async (slug: any) => {
  const query = qs.stringify(
    {
      filters: {
        slug: slug,
      },
      populate: "*",
    },
    {
      encodeValuesOnly: true,
    }
  );

  const url = `/api/microsites?${query}`;
  return await Api.get(url);
};

export default {
  getPromotionBySlug,
};
