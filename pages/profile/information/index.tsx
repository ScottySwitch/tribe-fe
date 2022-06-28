import {
  loginInforItem,
  user,
  userId,
  token,
  userInformationList 
} from "constant"
import { UserInformationList } from "enums"
import { useState } from "react"
import SectionLayout from "components/SectionLayout/SectionLayout"
import Heading from "components/Heading/Heading"
import UserInformation from "components/UserProfilePage/UserInformation/TabContent/UserInformation"
import ChangePassword from "components/UserProfilePage/UserInformation/TabContent/ChangePassword"
import styles from "styles/BizInformation.module.scss"
import style from "styles/Profile.module.scss"

const ProfileInformationPage = () => {
  const informationList = userInformationList
  const [selectedTab, setSelectedTab] = useState<string>(informationList[0].label)

  const tabContent = () => {
    switch (selectedTab) {
      case UserInformationList.USER_INFORMATION:
        return (<UserInformation />)
      case UserInformationList.CHANGE_PASSWORD:
        return (<ChangePassword />)
      default:
        return <div />
    }
  }

  const handleLogout = () => {
    localStorage.removeItem(loginInforItem)
    localStorage.removeItem(user)
    localStorage.removeItem(userId)
    localStorage.removeItem(token)
    window.location.href = "/"
  }

  return (
    <SectionLayout backgroundColor className={style.section_user_information} containerClassName={style.container_user_information}>
      <div className={`${styles.biz_information} ${style.user_information}`}>
        <div className={`${styles.left_col} ${style.menu_sidebar}`}>
          <div className={`${styles.left_col_bottom}  mt-0`}>
            <div>View profile</div>
            {informationList.map((item) => (
              <div
                className="flex gap-3 justify-between"
                key={item.label}
                onClick={() => setSelectedTab(item.label)}
              >
                <Heading
                  icon={item.icon}
                  type="tab"
                  text={item.label}
                  selected={selectedTab === item.label}
                />
                {/* {item.star && <Icon icon="star-2" color="#653fff" />} */}
              </div>
            ))}
            <div className="flex gap-3 justify-between" onClick={handleLogout}>
              <Heading icon="logout" type="tab" text="Log out" selected={false} />
            </div>
          </div>
        </div>
        <div className={`${styles.right_col} ${style.tab_content} overflow-visible`}>{tabContent()}</div>
      </div>
    </SectionLayout>
  )
}

export default ProfileInformationPage