import Break from "components/Break/Break"
import Button from "components/Button/Button"
import InforCard from "components/InforCard/InforCard"
import SectionLayout from "components/SectionLayout/SectionLayout"
import Upload from "components/Upload/Upload"
import styles from "./TabContent.module.scss"

interface PhotosVideosProps {
  isPaid: boolean
  submitFormData?: (form: { [key: string]: any }) => void
  formData?: { [key: string]: any }
}

const PhotosVideos = (props: PhotosVideosProps) => {
  const { isPaid, formData = {}, submitFormData } = props

  return (
    <SectionLayout
      title="Photos/videos"
      className={styles.photos_videos}
      containerClassName="w-full"
    >
      <div className={styles.tips_button}>
        <div className={styles.tips}>
          <strong>Tips:</strong> Click the pin icon to put 5 images on the top.
        </div>
        <Button text="Edit products" width={200} />
      </div>
      <Break />
      <div className={styles.product_container}>
        <Upload
          accept="image/*, video/*"
          multiple
          type="media"
          fileList={formData.images}
          isPaid={isPaid}
        />
      </div>
      <Break />
    </SectionLayout>
  )
}

export default PhotosVideos
