import Heading from "components/Heading/Heading"
import ReviewCompleted from "components/ReviewsPage/ReviewCompleted/ReviewCompleted"
import { get } from "lodash"
import Image from "next/image"

interface HomepageReviewsProps {
  isPaid?: boolean
  isViewPage?: boolean
  reviews: any[]
}

const HomepageReviews = (props: HomepageReviewsProps) => {
  const { reviews, isPaid, isViewPage } = props
  return (
    <div>
      <Heading text="Reviews" />
      <div className="mt-5">
        {Array.isArray(reviews) && reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index}>
              <ReviewCompleted
                isPaid={isPaid}
                repliable
                user={get(review, "attributes.user.data.attributes")}
                listImage={get(review, "attributes.images")}
                content={get(review, "attributes.content")}
                dateVisit={get(review, "attributes.visited_date")}
                rating={get(review, "attributes.rating")}
              />
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Image src={require("public/images/no-review.svg")} width={100} alt="" />
            <p>There are no review yet</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default HomepageReviews
