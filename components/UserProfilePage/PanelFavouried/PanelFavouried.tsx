import { get } from "lodash";
import { useEffect, useState } from "react";

import { ProfileTabFavourited } from "enums";
import TabsHorizontal, { ITab } from "components/TabsHorizontal/TabsHorizontal";
import InforCard, { InforCardProps } from "components/InforCard/InforCard";
import BizlistingApi from "services/biz-listing";

import styles from "./PanelFavouried.module.scss";
import UserApi from "services/user";
import Loader from "components/Loader/Loader";
import { useRouter } from "next/router";

const ListCard = (props: {
  data: { [key: string]: any }[];
  onRemoveFavourite: (listing) => void;
}) => {
  const { data, onRemoveFavourite } = props;
  const router = useRouter();
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 md:gap-x-5 gap-y-4 md:gap-y-8">
      {Array.isArray(data) &&
        data.map((card, index) => (
          <InforCard
            key={index}
            imgUrl={card.imgUrl}
            title={card.title}
            rate={card.rate}
            rateNumber={card.rateNumber}
            followerNumber={card.followerNumber}
            price={card.price}
            currency={(card.currency)?.toUpperCase()}
            categories={card.categories}
            tags={card.tags}
            iconTag={true}
            isVerified={card.isVerified}
            description={card.description}
            className="w-full"
            isFavourited={true}
            onFavouritedClick={() => onRemoveFavourite(card)}
            // onClick={() => router.push(`biz/home/${card.slug}`)}
          />
        ))}
    </div>
  );
};

const FavouriedPanel = () => {
  const [currentTab, setCurrentTab] = useState<ProfileTabFavourited>(
    ProfileTabFavourited.EAT
  );
  const [loading, setLoading] = useState(true);
  const [favouriteListings, setFavouriteListings] = useState<any>();
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const getListingFavourite = async (slug) => {
      const data = await BizlistingApi.getListingFavouriteByCategory(slug);
      const rawData = get(data, "data.data");
      const listings =
        (Array.isArray(rawData) &&
          rawData.map((item) => ({
            id: item.id,
            images: item.images || [],
            title: item.name,
            slug: item.slug,
            isVerified: item.is_verified,
            address: item.address,
            country: item.country,
            description: item.description,
            followerNumber: get(item, "user_listing_follows.length") || 0,
            tags: item.tags,
            categories: item.categories,
            price: item.min_price || "",
            currency: (item.currency)?.toUpperCase() || "",
            rate: item.rate,
            rateNumber: item.rate_number,
          }))) ||
        [];
      setFavouriteListings(listings);
      setTotal(listings.length);
      setLoading(false);
    };

    getListingFavourite(currentTab);
  }, [currentTab, loading]);

  const handleRemoveFavorite = async (removedListing) => {
    console.log("removedListing", removedListing);
    let userInfo = JSON.parse(localStorage.getItem("user") || "{}");

    await UserApi.removeListingFavourite({
      userId: userInfo.id,
      listingFavouriteId: removedListing.id,
    });
    setLoading(true);
  };

  const TabList: ITab[] = [
    {
      label: ProfileTabFavourited.EAT,
      value: ProfileTabFavourited.EAT,
      content: (
        <ListCard
          data={favouriteListings}
          onRemoveFavourite={handleRemoveFavorite}
        />
      ),
    },
    {
      label: ProfileTabFavourited.BUY,
      value: ProfileTabFavourited.BUY,
      content: (
        <ListCard
          data={favouriteListings}
          onRemoveFavourite={handleRemoveFavorite}
        />
      ),
    },
    {
      label: ProfileTabFavourited.SEE_DO,
      value: ProfileTabFavourited.SEE_DO,
      content: (
        <ListCard
          data={favouriteListings}
          onRemoveFavourite={handleRemoveFavorite}
        />
      ),
    },
    {
      label: ProfileTabFavourited.TRANSPORT,
      value: ProfileTabFavourited.TRANSPORT,
      content: (
        <ListCard
          data={favouriteListings}
          onRemoveFavourite={handleRemoveFavorite}
        />
      ),
    },
    {
      label: ProfileTabFavourited.STAY,
      value: ProfileTabFavourited.STAY,
      content: (
        <ListCard
          data={favouriteListings}
          onRemoveFavourite={handleRemoveFavorite}
        />
      ),
    },
  ];

  if (loading) {
    return (
      <div className="w-full flex justify-center mt-20">
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.favouried_panel}>
      <TabsHorizontal
        type="primary-outline"
        tablist={TabList}
        className={styles.favouried_tab}
        onCurrentTab={(e) => {
          console.log(e);
          setCurrentTab(e);
        }}
      />
      {total > 0 && <div className={styles.total}>Total: {total}</div>}
    </div>
  );
};

export default FavouriedPanel;
