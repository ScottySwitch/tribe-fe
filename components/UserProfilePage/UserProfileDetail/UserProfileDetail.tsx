import { useRouter } from "next/router"
import { ProfileTabs } from "enums"
import TabsHorizontal, { ITab } from "components/TabsHorizontal/TabsHorizontal"
import React from "react"
import Image from "next/image"
import Button from "components/Button/Button"
import SectionLayout from "components/SectionLayout/SectionLayout"
import CompleteProfileCard from "../CompleteProfileCard/CompleteProfileCard"
import FavouriedPanel from "../PanelFavouried/PanelFavouried"
import SavedDealsPanel from "../PanelSavedDeals/PanelSavedDeals"
import ContributedPanel from "../PanelContributed/PanelContributed"
import PanelAbout from "../PanelAbout/PanelAbout"
import styles from "./UserProfileDetail.module.scss"

const GroupHeadingOne = (props: {name: string, imageUrl: string}) => {
  const { name, imageUrl } = props

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
      <CompleteProfileCard
        stepCurrent={3}
        stepCompleted={5}
        linkable="/profile/information"
        className={styles.CompleteProfileCard_desktop}
      />
    </div>
  )
}

const GroupHeadingTwo = (props: {contributions: number, following: number, points: number}) => {
  const { contributions, following, points } = props
  const router = useRouter()
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
          <div className={styles.outstanding_criteria}>
            <h5>Points</h5>
            <span>{points}</span>
          </div>
        </div>
        <Button
          className={styles.btn_edit_profile}
          variant="secondary"
          text="Edit profile"
          width={164}
          onClick={() => {router.push("/profile/information")}}
        />
      </div>
      <CompleteProfileCard
        stepCurrent={3}
        stepCompleted={5}
        linkable="/profile/information"
        className={styles.CompleteProfileCard_mobile}
      />
    </React.Fragment>
  )
}

const TabList: ITab[] = [
  { label: ProfileTabs.FAVOURITED, value: ProfileTabs.FAVOURITED, content: <FavouriedPanel /> },
  { label: ProfileTabs.SAVED_DEALS, value: ProfileTabs.SAVED_DEALS, content: <SavedDealsPanel /> },
  { label: ProfileTabs.CONTRIBUTED, value: ProfileTabs.CONTRIBUTED, content: <ContributedPanel /> },
  { label: ProfileTabs.ABOUT, value: ProfileTabs.ABOUT, content: <PanelAbout /> },
]

const UserProfileDetail = () => {

  return (
    <React.Fragment>
      <GroupHeadingOne
        name="Anna Nhun"
        imageUrl="https://picsum.photos/218"
        />
      <GroupHeadingTwo
        contributions={20}
        following={100}
        points={32}
      />
      <TabsHorizontal tablist={TabList} type="secondary-no-outline" className={styles.profile_tab} />
    </React.Fragment>
  )
}

export default UserProfileDetail