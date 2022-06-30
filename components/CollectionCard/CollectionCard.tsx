import Image from "next/image"
import styles from "./CollectionCard.module.scss"

interface CollectionCardProps {
  imgUrl?: string
  title?: string
}

const CollectionCard = (props: CollectionCardProps) => {
  const { imgUrl, title } = props
  return (
    <div className={styles.collection_card}>
      <div className={styles.title}>{title}</div>
      {imgUrl && <Image alt="" layout="fill" src={imgUrl} />}
    </div>
  )
}

export default CollectionCard
