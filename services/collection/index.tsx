import Api from "../index";

const qs = require("qs");

const getCollection = async (params: any) => {
  let query: any = {};
  const {category, pinnedHomepage} = params
  if (category) {
    query.category = category
  }
  if (pinnedHomepage) {{
    query.pinned_homepage = pinnedHomepage
  }}
  query = qs.stringify(query)
  const url = `/api/collections/get-collection-custom?${query}`;
  return await Api.get(url);
};

const getAllCollection = async () => {
  const query = qs.stringify(
    {
      populate: "*",
    },
    {
      encodeValuesOnly: true,
    }
  );
  const url = `/api/collections?${query}`;
  return await Api.get(url);
};

const getAllCollectionByCollectionSlug = async (collectionSlug: string) => {
  const query = qs.stringify(
    {
      filters: {
        slug: collectionSlug,
      },
      populate: "*",
    },
    {
      encodeValuesOnly: true,
    }
  );
  const url = `/api/collections?${query}`;
  return await Api.get(url);
};

const CollectionApi = {
  getCollection,
  getAllCollection,
  getAllCollectionByCollectionSlug,
};

export default CollectionApi;
