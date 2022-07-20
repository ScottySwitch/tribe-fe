import Button from "components/Button/Button";
import SectionLayout from "components/SectionLayout/SectionLayout";
import TabsHorizontal, { ITab } from "components/TabsHorizontal/TabsHorizontal";
import TopSearches from "components/TopSearches/TopSearches";
import CompleteProfileCard from "components/UserProfilePage/CompleteProfileCard/CompleteProfileCard";
import CoverImage from "components/UserProfilePage/CoverImage/CoverImage";
import PanelAbout, {
  UserPropsData,
} from "components/UserProfilePage/PanelAbout/PanelAbout";
import ContributedPanel from "components/UserProfilePage/PanelContributed/PanelContributed";
import FavouriedPanel from "components/UserProfilePage/PanelFavouried/PanelFavouried";
import SavedDealsPanel from "components/UserProfilePage/PanelSavedDeals/PanelSavedDeals";
import {
  dummyKeywords,
  dummySavedDeals,
  dummyUserInfo,
  inforCardList,
  user,
} from "constant";
import { ProfileTabs } from "enums";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { get } from "lodash";
import styles from "styles/Profile.module.scss";
import { userInfo } from "os";

const GroupHeadingOne = (props: { name: string; imageUrl: string }) => {
  const { name, imageUrl } = props;
  return (
    <div className={styles.group_heading_one}>
      <div className="flex items-end flex-wrap lg:flex-nowrap">
        <div className={styles.avatar}>
          <Image
            className={styles.avatar_img}
            src={imageUrl || "avatar_default"}
            width="100%"
            height="100%"
            layout="responsive"
            alt="avatar"
          />
        </div>
        <h2 className={styles.name}>{name}</h2>
      </div>
      {/* <CompleteProfileCard
        stepCurrent={3}
        stepCompleted={5}
        linkable="/profile/information"
        className={styles.CompleteProfileCard_desktop}
      /> */}
    </div>
  );
};

const GroupHeadingTwo = (props: {
  contributions: number;
  following: number;
  points: number;
}) => {
  const { contributions, following, points } = props;
  const router = useRouter();
  return (
    <React.Fragment>
      <div className={styles.group_heading_two}>
        <div className={styles.outstanding_criteria_container}>
          <div className={styles.outstanding_criteria}>
            <h5>Contributions</h5>
            <span>{contributions}</span>
          </div>
          <div className={styles.outstanding_criteria}>
            <h5>Following</h5>
            <span>{following}</span>
          </div>
          {/* <div className={styles.outstanding_criteria}>
            <h5>Points</h5>
            <span>{points}</span>
          </div> */}
        </div>
        <Button
          className={styles.btn_edit_profile}
          variant="secondary"
          text="Edit profile"
          width={164}
          onClick={() => {
            router.push("/profile/information");
          }}
        />
      </div>
      {/* <CompleteProfileCard
        stepCurrent={3}
        stepCompleted={5}
        linkable="/profile/information"
        className={styles.CompleteProfileCard_mobile}
      /> */}
    </React.Fragment>
  );
};

const ProfilePage = () => {
  const router = useRouter();
  const [userInfor, setUserInfo] = useState<UserPropsData>({
    email: "",
    phone_number: "",
    country: "",
    gender: "male",
    educate_level: "",
    industry: "",
    birthday: "",
  });

  useEffect(() => {
    let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    if (!localStorage.getItem("user")) {
      router.push("/");
    }
    setUserInfo(userInfo);
  }, []);

  const TabList: ITab[] = [
    {
      label: ProfileTabs.FAVOURITED,
      value: ProfileTabs.FAVOURITED,
      content: <FavouriedPanel />,
    },
    {
      label: ProfileTabs.SAVED_DEALS,
      value: ProfileTabs.SAVED_DEALS,
      content: <SavedDealsPanel data={dummySavedDeals} />,
    },
    {
      label: ProfileTabs.CONTRIBUTED,
      value: ProfileTabs.CONTRIBUTED,
      content: <ContributedPanel userInfor={userInfor} />,
    },
    {
      label: ProfileTabs.ABOUT,
      value: ProfileTabs.ABOUT,
      content: <PanelAbout data={userInfor} />,
    },
  ];

  return (
    <div className="wrapper-profile">
      <div className={styles.section_cover_image}>
        <CoverImage
          layout="fill"
          imageUrl={require("../../public/images/default-banner-profile.png")}
        />
      </div>
      <SectionLayout
        className={styles.section_profile}
        containerClassName={styles.section_profile_container}
      >
        <GroupHeadingOne
          name={`${userInfor.first_name} ${userInfor.last_name || ""}`}
          imageUrl={userInfor.avatar || "https://picsum.photos/218"}
        />
        <GroupHeadingTwo
          contributions={0}
          following={get(userInfor, "user_listing_follows.length")}
          points={0}
        />
        <TabsHorizontal
          tablist={TabList}
          type="secondary-no-outline"
          className={styles.profile_tab}
        />
        <TopSearches className={styles.top_searches} />
      </SectionLayout>
    </div>
  );
};

export default ProfilePage;
