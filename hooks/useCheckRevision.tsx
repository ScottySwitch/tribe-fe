import { get } from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import bizListingApi from "services/biz-listing";

const useCheckRevision = (loading: boolean, listingSlug?: string) => {
  const [revisionId, setRevisionId] = useState<number | undefined>(undefined);
  const [isRevision, setIsRevision] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkIsRevision = async () => {
      const data = await bizListingApi.getInfoOwnerBizListingBySlug(
        listingSlug
      );

      const currentRevisionId = get(data, "data.data[0].id");
      const currentIsRevision = get(data, "data.is_revision");

      if (currentIsRevision) {
        setIsRevision(true);
        setRevisionId(currentRevisionId);
      } else {
        setIsRevision(false);
        setRevisionId(undefined);
      }
    };

    loading && checkIsRevision();
  }, [loading, listingSlug]);

  return { isRevision, revisionId };
};

export default useCheckRevision;
