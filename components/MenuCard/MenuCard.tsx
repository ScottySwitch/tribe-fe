import Image from "next/image"
import styles from "./MenuCard.module.scss"

interface MenuCardProps {
  imgUrl: string
  title: string
}

const MenuCard = (props: MenuCardProps) => {
  const { imgUrl, title } = props

  return (
    <div className={styles.menu_container}>
      {imgUrl && <Image src={imgUrl} alt="" width={200} height={200} />}
      <div className={styles.title}>{title}</div>
    </div>
  )
}

export default MenuCard
