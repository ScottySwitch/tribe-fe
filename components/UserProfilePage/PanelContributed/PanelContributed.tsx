import TabsHorizontal, { ITab } from "components/TabsHorizontal/TabsHorizontal";
import React, { useEffect, useState } from "react";
import ListingInfoCardInReview from "components/ReviewsPage/ListingInfoCardInReview/ListingInfoCardInReview";
import styles from "./PanelContributed.module.scss";
import ContributeApi from "services/contribute";
import { dummyApproved, dummyDenied, dummyPending } from "constant";
import UserReviewCard, {
  UserReviewCardProps,
} from "components/ReviewsPage/UserReviewCard/UserReviewCard";
import { get, isEmpty } from "lodash";
import { format } from "date-fns";
import { isLocalURL } from "next/dist/shared/lib/router/router";
import Loader from "components/Loader/Loader";
interface IBiz {
  title: string;
  imgUrl: string;
  location: string;
  rate?: number;
  rateNumber?: number;
  followerNumber?: number;
  tags?: any[];
}
export interface ListCardProps extends UserReviewCardProps {
  biz_listing?: IBiz;
}

const formatDate = (date) => {
  return format(date ? new Date(date) : new Date(), "dd-MMM-yyyy");
};

const ListCard = (props: { data: ListCardProps[] }) => {
  const { data } = props;

  return (
    <div className="flex flex-col gap-5">
      {data?.map((item: ListCardProps, index) => {
        const reviewListing = get(item, "review") || {};
        const bizListing =
          get(item, "biz_listing") || get(item, "biz_listing_revision") || {};
        return (
          <UserReviewCard
            key={index}
            isDivier
            avatarUrl={reviewListing.avatar}
            listImage={reviewListing.images}
            content={reviewListing.content}
            dateVisit={reviewListing.visited_date}
            rating={reviewListing.rating}
            createdDate={formatDate(reviewListing.date_create_reply)}
            approvedDate={formatDate(item.publishedAt)}
            status={item.status}
            displayName={reviewListing.displayName}
            className={styles.user_review_card}
            censorshipLabel={
              isEmpty(reviewListing) ? "has created a listing" : "has reviewed"
            }
          >
            <ListingInfoCardInReview
              title={bizListing.name}
              imgUrl={get(bizListing, "images[0]")}
              location={`${bizListing.address}, ${bizListing.country}`}
              rate={bizListing.rate}
              rateNumber={bizListing.rate_number}
              slug={bizListing.slug}
              tags={bizListing.tags}
              followerNumber={
                get(bizListing, "user_listing_follows.length") || "0"
              }
            />
          </UserReviewCard>
        );
      })}
    </div>
  );
};

const ContributedPanel = ({ userInfor }: { userInfor: any }) => {
  const [listCard, setListCard] = useState<ListCardProps[] | any>();
  const [currentTab, setCurrentTab] = useState<string>();
  const [total, setTotal] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [contributions, setContributions] = useState<{ [key: string]: any }>(
    []
  );


  useEffect(() => {
    let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    userInfo &&
      userInfo?.token &&
      setIsLoading(true)
      ContributeApi.getUserContribute()
        .then((res) => {
          const contributionRawData = get(res, "data.data");

          let contributionData: { pending: any[]; approved: any[] } = {
            pending: [],
            approved: [],
          };

          Array.isArray(contributionRawData) &&
            contributionRawData.forEach((cont) => {
              switch (cont.status) {
                case "Pending":
                  contributionData.pending.push(cont);
                  break;
                case "Approved":
                  contributionData.approved.push(cont);
                  break;
              }
            });

          setContributions(contributionData);
          console.log("contributionData", contributionData);
        })
        .catch((error) => console.log(error))
        .finally(() => {setIsLoading(false)});
  }, []);

  const TabList: ITab[] = [
    {
      label: "Pending",
      value: "pending",
      content: <ListCard data={contributions.pending} />,
    },
    {
      label: "Approved",
      value: "approved",
      content: <ListCard data={contributions.approved} />,
    },
    // { label: "Denied", value: "denied", content: <ListCard data={listCard} /> },
  ];

  useEffect(() => {
    switch (currentTab) {
      case "pending":
        setListCard(dummyPending);
        break;
      case "approved":
        setListCard(dummyApproved);
        break;
      // case "denied":
      //   setListCard(dummyDenied);
      //   break;
    }
    setTotal(listCard?.length);
  }, [currentTab]);

  if (isLoading) {
    return (
      <div className="w-full flex justify-center mt-20">
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.contributed_panel}>
      {total && <div className={styles.total}>Total: {total}</div>}
      <TabsHorizontal
        selectedTab={"pending"}
        tablist={TabList}
        type="primary-outline"
        className={styles.contributed_tab}
        onCurrentTab={(e) => setCurrentTab(e)}
      />
    </div>
  );
};

export default ContributedPanel;
