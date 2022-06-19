import classNames from "classnames"
import Icon from "components/Icon/Icon"
import { loginInforItem, user, userId, token } from "constant"
import { ILoginInfor } from "pages/_app"

import styles from "./Menu.module.scss"

interface MenuMenuProps {
  loginInfor: ILoginInfor
  mobile?: boolean
  onShowCategoriesModal?: () => void
}

export const menuItems = [
  { icon: "categories-color", label: "Categories" },
  { icon: "deal", label: "Saved deals" },
  { icon: "heart-color", label: "Favorited", borderBottom: true },
  { icon: "comment-color", label: "Edit profile" },
  { icon: "settings-color", label: "Settings", borderBottom: true },
  { icon: "like-color-2", label: "Referral code" },
  { icon: "business", label: "Tribes for Businesses" },
  { icon: "support-color", label: "Support" },
  { icon: "eng-flag", label: "Languages" },
]

const Menu = (props: MenuMenuProps) => {
  const { loginInfor = {}, mobile, onShowCategoriesModal } = props
  const handleLogout = () => {
    localStorage.removeItem(loginInforItem)
    localStorage.removeItem(user)
    localStorage.removeItem(userId)
    localStorage.removeItem(token)
    window.location.href = "/"
  }

  return (
    <>
      {menuItems.map((item) => {
        const menuItemClassName = classNames(styles.menu_item, {
          [styles.border_bottom]: mobile && item.borderBottom,
        })
        return (
          <div key={item.label} className={menuItemClassName} onClick={onShowCategoriesModal}>
            <Icon icon={item.icon} size={20} />
            <div>{item.label}</div>
          </div>
        )
      })}
      {!!loginInfor.token && (
        <div onClick={handleLogout} className={styles.logout}>
          <Icon icon="log-out" size={20} color="#e60112" />
          <div>Logout</div>
        </div>
      )}
    </>
  )
}

export default Menu
