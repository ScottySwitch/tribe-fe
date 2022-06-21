import { useEffect, useState } from "react"
import Input from "components/Input/Input"
import Icon from "components/Icon/Icon"
import Image from "next/image"
import Upload from "components/Upload/Upload"
import Select from "components/Select/Select"
import Checkbox from "components/Checkbox/Checkbox"
import Button from "components/Button/Button"
import styles from "./ReviewCard.module.scss"
import Rate from "components/Rate/Rate"
import Link from "next/link"

const dummyDate = [
  {label: "April 2022", value: "April 2022"},
  {label: "March 2022", value: "March 2022"},
  {label: "Febuary 2022", value: "Febuary 2022"},
  {label: "January 2022", value: "January 2022"},
  {label: "December 2021", value: "December 2021"},
]

export const rateType = {
  1: "Very poor",
  2: "Poor",
  3: "OK",
  4: "Good",
  5: "Very good",
}

export const ReviewForm = (props) => {
  const {onSubmit} = props

  return (
    <div className="form_edit">
      <div className={styles.form_group}>
        <Input
          size="large"
          placeholder="Review ( 100 character minumum )"
          width={`100%`}
          maxLength={100}
          autoFocus
        />
      </div>
      <div className={styles.form_group}>
        <div className={styles.form_label}>Add images/ videos ( up to 3 )</div>
        <Upload
          multiple={true}
          accept="images"
          type="media"
          centerIcon={<Icon icon="plus" />}
        />
      </div>
      <div className={styles.form_group}>
        <Select
          label="When did you purchase item / use services?"
          placeholder="Select one"
          size="large"
          options={dummyDate}
          onChange={() => {}}
        />
      </div>
      <div className={styles.form_group}>
        <Checkbox id={Math.random().toString()} label="I certify that this review is solely based on my own experience, my genuine opinion and that I have no personal or business relationship with the establishment. I have not been offered any incentive or payment originating from the establishment to write this review. I understand that Tribes has a zero-tolerance policy on fake reviews"/>
      </div>
      <Button text="Submit" width="auto" onClick={onSubmit}/>
    </div>
  )
}

interface IReviewCardProps {
  id: string | number
  title: string
  imgUrl: string
  isVerified: boolean
  rateNumber: number
  location?: string
  onSubmit?: () => void
}

const ReviewCard = (props: IReviewCardProps) => {
  const {
    id,
    title,
    imgUrl,
    isVerified,
    rateNumber,
    location,
    onSubmit
  } = props

  const [expanded, setExpanded] = useState<boolean>(false)
  const [rating, setRating] = useState<number>()
  const [ratingType, setRatingType] = useState<string>("")
  const [ratingReadonly, setRatingReadonly] = useState<boolean>(true)

  const handleReview = () => {
    setExpanded(!expanded)
    setRatingReadonly(false)
  }

  const handleCickRating = (value: number) => {
    setRating(value)
    setRatingType(rateType[value])
  }
  
  return (
    <div className={styles.review_card}>
      <div className={styles.featured_image}>
        {
          isVerified && (
            <div className={styles.verified}>
              <Icon icon="verified-tag" className={styles.verified_icon} />
            </div>
          )
        }
        <Image
          src={imgUrl}
          width="100%"
          height="56%"
          layout="responsive"
          className="rounded-lg"
          alt="review_featured_image"
        />
      </div>
      <div className="w-full">
        <h4 className={styles.title}>
          <Link href={`/reviews/${id}`}>{title}</Link>
        </h4>
        <div className={styles.location}>{location}</div>
        <div className={styles.cta_group}>
          <div>
            <Rate
              readonly={ratingReadonly}
              initialRating={rating}
              placeholderRating={rateNumber}
              onClick={handleCickRating}
            />
          </div>
          {
            expanded
            ? (<div className={styles.cta_click}>{ratingType}</div>)
            : (<div className={`${styles.cta_click} cursor-pointer`} onClick={handleReview}>Click to rate</div>)
          }
        </div>
        { expanded && <ReviewForm onSubmit={onSubmit} /> }
      </div>
    </div>
  )
}

export default ReviewCard