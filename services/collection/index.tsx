import Api from "../index";

const qs = require("qs");

const getCollection = async () => {
  const url = `/api/collections/get-collection-custom`;
  return await Api.get(url);
};

const getCollectionByCategory = async (category) => {
  const url = `/api/collections/get-collection-by-category?category=${category}`;
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
  getCollectionByCategory,
  getAllCollection,
  getAllCollectionByCollectionSlug,
};

export default CollectionApi;
