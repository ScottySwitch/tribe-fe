import classNames from 'classnames'
import Button from 'components/Button/Button'
import Icon from 'components/Icon/Icon'
import Image from 'next/image'
import Link from 'next/link'
import { PromotionType } from './enums'
import styles from "./PromotionCard.module.scss"

export interface IPromotionProp {
  imgUrl: string
  title: string
  expiredAt: string
  type: string | number
  link?: string
  favourite?: boolean
}

const PromotionCard = (props: IPromotionProp) => {
  const {
    imgUrl,
    title,
    expiredAt,
    link,
    type,
    favourite
  } = props

  const buttonClasses = classNames({
    [styles.promotion_cta_primary]: PromotionType.CLAIM === type || PromotionType.USE_NOW === type,
    [styles.promotion_cta_secondary]: PromotionType.FULLY_REDEEMED === type,
  })

  const types = {
    [PromotionType.CLAIM]: 'Claim',
    [PromotionType.USE_NOW]: 'Use now',
    [PromotionType.FULLY_REDEEMED]: 'Fully redeemed',
  }

  return (
    <div className={styles.promotion_card}>
      <div className={styles.promotion_avatar}>
        <Image
          src={imgUrl}
          width={130}
          height={130}
          alt="promotion-alt"
          className={styles.promotion_image}
        />
        {
          favourite &&
          <div className={styles.promotion_favourite}>
            <Icon icon="like-solid" color="#e60112"/>
          </div>
        }
      </div>
      <div className={styles.promotion_info}>
        <div>
          <h3 className={styles.promotion_title}>{title}</h3>
          <div className={styles.promotion_date}>{expiredAt}</div>
        </div>
        <div className={styles.promotion_info_cta}>
          <div>
            {
              type &&
              <Button
                className={buttonClasses}
                text={types[type]}
                width="max-content"
              />
            }
          </div>
          {link && <Link href={link}>Terms</Link>}
        </div>
      </div>
    </div>
  )
}

export default PromotionCard