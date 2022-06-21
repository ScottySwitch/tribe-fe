import ModalReviewSuccess from "components/ReviewsPage/ModalReviewSuccess/ModalReviewSuccess"
import SectionLayout from "components/SectionLayout/SectionLayout"

const AddReviewPage = () => {
  return (
    <div>
      <SectionLayout>
        <ModalReviewSuccess visible={true} />
      </SectionLayout>
    </div>
  )
}

export default AddReviewPage