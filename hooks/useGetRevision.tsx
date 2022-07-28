import { get } from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import bizListingApi from "services/biz-listing";
import bizListingRevision from "services/biz-listing-revision";

const useGetRevision = (listingSlug?: string) => {
  const [loading, setLoading] = useState(true);
  const [revisionId, setRevisionId] = useState<number | undefined>(undefined);
  const [isRevision, setIsRevision] = useState(false);
  const [revisionListing, setRevisionListing] = useState<any>({});
  const router = useRouter();

  const getRevisionId = async (currentAttributes) => {
    console.log("revisionListing", revisionListing);
    const formatBizListingData = {
      name: get(revisionListing, "name"),
      slug: get(revisionListing, "slug"),
      biz_listing: revisionListing.id.toString(),
      email: revisionListing.email,
      parent_id: revisionListing.id.toString(),
      description: revisionListing.description,
      // price_range: priceRange,
      min_price: parseFloat(revisionListing?.min_price) || null,
      max_price: parseFloat(revisionListing?.max_price) || null,
      currency: revisionListing.currency
        ? revisionListing.currency.toLocaleLowerCase()
        : null,
      action: revisionListing.action,
      images: revisionListing.images,
      city: revisionListing.city,
      country: revisionListing.country,
      address: revisionListing.address,
      website: revisionListing.website,
      phone_number: revisionListing.phone_number,
      facilities_data: revisionListing.facilitiesData,
      open_hours: revisionListing.openHours,
      tags: revisionListing.tags.map((item) => item.id),
      social_info: revisionListing.social_info,
      is_verified: false,
      is_accepted: false,
      logo: revisionListing.logo,
      expiration_date: revisionListing.expiration_date,
      products: revisionListing.products.map((item) => item.id) || [],
      menus: revisionListing.menus.map((item) => item.id) || [],
      deals: revisionListing.deals.map((item) => item.id) || [],
      biz_invoices: revisionListing.biz_invoices.map((item) => item.id) || [],
      reviews: revisionListing.reviews.map((item) => item.id) || [],
      categories: revisionListing.categories.map((item) => item.id) || [],
      ...currentAttributes,
    };
    const response = await bizListingRevision.createBizListingRevision(
      formatBizListingData
    );
    return get(response, "data.data.id");
  };

  useEffect(() => {
    const checkIsRevision = async () => {
      const data = await bizListingApi.getInfoOwnerBizListingBySlug(
        listingSlug
      );
      const listingData = get(data, "data.data[0]");
      const currentRevisionId = get(data, "data.data[0].id");
      const currentIsRevision = get(data, "data.is_revision");

      if (currentIsRevision) {
        setIsRevision(true);
        setRevisionId(currentRevisionId);
      } else {
        setIsRevision(false);
        setRevisionId(undefined);
      }
      setRevisionListing(listingData);
      setLoading(false);
    };

    loading && checkIsRevision();
  }, [loading, listingSlug]);

  return {
    loading,
    setLoading,
    revisionListing,
    isRevision,
    revisionId,
    getRevisionId,
  };
};

export default useGetRevision;
