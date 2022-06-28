import Image from "next/image"
import styles from "./CoverImage.module.scss"

interface CoverImageProps {
  className?: string
  imageUrl?: string
}

const CoverImage = (props: CoverImageProps) => {
  const {
    className = "",
    imageUrl,
  } = props

  return (
    <div className={`${className} ${styles.container}`}>
      <div className={styles.image}>
        <Image
          src={imageUrl || "cover_default"}
          height="100%"
          width="100%"
          layout="responsive"
          alt="cover_image"
        />
      </div>
    </div>
  )
}

export default CoverImage