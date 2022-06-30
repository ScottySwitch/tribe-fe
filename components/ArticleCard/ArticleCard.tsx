import Image from "next/image"
import styles from "./ArticleCard.module.scss"

interface CollectionCardProps {
  imgUrl?: string
  title?: string
  time?: string
}

const ArticleCard = (props: CollectionCardProps) => {
  const { imgUrl, title, time } = props
  return (
    <div className={styles.article_card}>
      <div className={styles.banner}>{imgUrl && <Image alt="" layout="fill" src={imgUrl} />}</div>
      <div className={styles.body}>
        <div className={styles.title}>{title}</div>
        <div className={styles.time}>{time}</div>
      </div>
    </div>
  )
}

export default ArticleCard
