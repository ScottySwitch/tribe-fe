import { ReactElement, useEffect, useRef, useState } from "react"
import Slider, { Settings } from "react-slick"
import Modal, { ModalProps } from "components/Modal/Modal"
import Button from "components/Button/Button"
import Icon from "components/Icon/Icon"
import ScrollingBox from "components/ScrollingBox/ScrollingBox"
import Image from "next/image"
import styles from "./ProductDetailsModal.module.scss"

export interface IProduct {
  id: number
  title: string
  images?: any[]
  price?: string | number
  priceSale?: string | number
  discount?: string | number
  description?: string
  type: "paid" | "klook" | "free" | ""
}

interface ProductDetailsModalProps extends ModalProps {
  data: IProduct
  onShare?: () => void
  onKlook?: () => void
  onBookNow?: () => void
}

const SliderSyncing = (props) => {
  
  const { images } = props
  
  const [navThumbnail, setNavThumbnail] = useState<any>();
  const [navGallery, setNavGallery] = useState<any>();

  const refSlider1 = useRef<any>(null);
  const refSlider2 = useRef<any>(null);

  const handlePrev = () => {
    if (refSlider2 && refSlider2.current) {
      refSlider2.current.slickPrev();
    }
  }
  const handleNext = () => {
    if (refSlider2 && refSlider2.current) {
      refSlider2.current.slickNext();
    }
  }

  useEffect(() => {
    setNavThumbnail(refSlider1.current);
    setNavGallery(refSlider2.current);
  }, [])

  const configThumbnail: Settings = {
    dots: false,
    arrows: false,
    infinite: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: "linear",
    asNavFor: navGallery
  }
  
  const configGallery: Settings = {
    className: styles.slider_gallery_item,
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    cssEase: "linear",
    focusOnSelect: true,
    asNavFor: navThumbnail,
    adaptiveHeight: true
  }

  return (
    <div className={styles.slider_syncing}>
      <Slider ref={refSlider1} {...configThumbnail} className={styles.slider_thumbnail}>
        {images?.map((image, index) => (
          <div key={index}>
            <Image src={image} height="100%" width="100%" layout="responsive" alt={`thumbnail-${index}`}/>
          </div>
        ))}
      </Slider>
      <div className={styles.slider_gallery_container}>
        <div onClick={handlePrev} className={styles.btn_prev}>
          <Icon icon="carret-left" size={20} color="#FFFFFF"/>
        </div>
        <Slider ref={refSlider2} {...configGallery} className={styles.slider_gallery}>
          {images?.map((image, index) => (
            <div key={index}>
              <Image src={image} height="100%" width="100%" layout="responsive" alt={`gallery-${index}`}/>
            </div>
          ))}
        </Slider>
        <div onClick={handleNext} className={styles.btn_next}>
          <Icon icon="carret-right" size={20} color="#FFFFFF"/>
        </div>
      </div>
    </div>
  )
}


const ProductDetailsModal = (props: ProductDetailsModalProps) => {
  const {
    data,
    visible,
    onClose,
    onShare,
    onKlook,
    onBookNow,
  } = props

  useEffect

  return (
    <Modal visible={visible} width="100%" maxWidth={1028}>
      <div className={styles.container}>
        <div className={styles.close} onClick={onClose}>
          <Icon icon="cancel-mobile"/>
        </div>
        <div className={styles.container_gallery}>
          <SliderSyncing images={data.images}/>
        </div>

        <div className={styles.container_info}>
          <h2 className={styles.title}>{data.title}</h2>
          <div className="flex items-center justify-between mb-[10px]">
            <div className="flex items-center gap-[16px]">
              <div className={styles.price_sale}>
                <span>$</span>
                <span>{data.priceSale}</span>
              </div>
              <div className={styles.price}>
                <span>$</span>
                <span>{data.price}</span>
              </div>
              <div className={styles.discount}>
                <div className={`${styles.badge} ${styles.badge_warning}`}>{data.discount}% OFF</div>
              </div>
            </div>
            <Button
              className={styles.btn_share}
              variant="underlined"
              text="Share"
              prefix={<Icon icon="share" color="#7F859F" size={14}/>}
              onClick={onShare}
              />
          </div>
          {
            data?.description && (
            <ScrollingBox>
              <div className={styles.description} dangerouslySetInnerHTML={{__html: data.description}}></div>
            </ScrollingBox>
            )
          }
          <div className={styles.call_to_action}>
            {(data?.type && data?.type !== "free") && (<Button text="Book on KLOOK" backgroundColor="#FF5B02" className="text-sm" onClick={onKlook}/>)}
            {data?.type === "paid" && (<Button text="Book now" backgroundColor="#E60112" className="text-sm" onClick={onBookNow}/>)}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ProductDetailsModal