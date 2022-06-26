import SectionLayout from "components/SectionLayout/SectionLayout"
import TopSearches from "components/TopSearches/TopSearches"
import CoverImage from "components/UserProfilePage/CoverImage/CoverImage"
import UserProfileDetail from "components/UserProfilePage/UserProfileDetail/UserProfileDetail"
import styles from "styles/Profile.module.scss"

const ProfilePage = () => {
  return (
    <div className="wrapper-profile">
      <div className={styles.section_cover_image}>
        <CoverImage imageUrl="https://picsum.photos/1440/360"/>
      </div>
      <SectionLayout>
        <UserProfileDetail/>
        <TopSearches keywords={["Fast Food ", "Desserts", "Beverages"]} className={styles.top_searches}/>
      </SectionLayout>
    </div>
  )
}

export default ProfilePage