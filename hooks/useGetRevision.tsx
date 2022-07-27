import { Item } from "framer-motion/types/components/Reorder/Item";
import { get } from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import bizListingApi from "services/biz-listing";
import bizListingRevision from "services/biz-listing-revision";
import { isArray } from "utils";

const useGetRevision = (listingSlug?: string) => {
  const [loading, setLoading] = useState(true);
  const [revisionId, setRevisionId] = useState<number | undefined>(undefined);
  const [isRevision, setIsRevision] = useState(false);
  const [revisionListing, setRevisionListing] = useState<any>({});
  const router = useRouter();

  const getRevisionId = async () => {
    console.log(revisionListing);
    const formatBizListingData = {
      is_accepted: false,
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
