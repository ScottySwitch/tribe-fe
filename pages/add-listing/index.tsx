import React, { useEffect, useState } from "react"

import AddListingPageOne from "components/AddListingPages/PageOne/AddListingPageOne"
import AddEatInfor from "components/AddListingPages/PageThree/AddInforSections/AddEatInfor"
import AddListingPageTwo from "components/AddListingPages/PageTwo/AddListingPageTwo"
import Button from "components/Button/Button"
import Modal from "components/Modal/Modal"
import { Categories, YesNo } from "enums"

import styles from "styles/AddListing.module.scss"
import Image from "next/image"
import { useRouter } from "next/router"

const defaultAddlistingForm: IAddListingForm = {
  category: "",
  relationship: "",
  listing: "",
  role: "",
  isOpen: "",
  openDate: "",
  businessName: "",
  description: "",
  isOnline: "",
  city: "",
  country: "",
  address: "",
  additionalAddress: "",
  contact: "",
  email: "",
  socialMedia: "",
  currency: "",
  minPrice: "",
  maxPrice: "",
}
export interface IAddListingForm {
  category: string
  relationship: string
  listing: string
  role: string
  isOpen: string
  openDate: string
  businessName: string
  description: string
  isOnline: string
  city: string
  country: string
  address: string
  additionalAddress: string
  contact: string
  email: string
  socialMedia: string
  currency: string
  minPrice: string
  maxPrice: string
}

const AddListing = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const [formData, setFormData] = useState(defaultAddlistingForm)
  const [showSubmitResult, setShowSubmitResult] = useState(false)

  const router = useRouter()

  const handlePrevPage = () => {
    setPageNumber(pageNumber - 1)
  }

  const handleNextPage = () => {
    setPageNumber(pageNumber + 1)
  }

  const handleUpdateFormData = (data) => {
    setFormData({ ...formData, ...data })
  }
  const handleSubmitFormData = (data) => {
    ///do CRUD things here
    console.log("data", data)
    const random = Math.floor(Math.random() * 10000)
    if (formData.relationship === YesNo.NO) {
      setShowSubmitResult(true)
    } else {
      router.push(`/add-listing/claim/${random}`)
    }
  }

  return (
    <div className={styles.add_listing}>
      <AddListingPageOne
        show={pageNumber === 1}
        onUpdateFormData={handleUpdateFormData}
        onNextPage={handleNextPage}
      />
      <AddListingPageTwo
        data={formData}
        show={pageNumber === 2}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
        onUpdateFormData={handleUpdateFormData}
      />
      {/* page three */}
      <React.Fragment>
        <AddEatInfor
          data={formData}
          show={pageNumber === 3 && formData.category === Categories.EAT}
          onPrevPage={handlePrevPage}
          onSubmitFormData={handleSubmitFormData}
        />
      </React.Fragment>
      <Modal visible={showSubmitResult} width={350} mobilePosition="center">
        <div className="p-5 flex flex-col items-center">
          <Image
            src={require("public/images/success-submit.svg")}
            width={100}
            height={100}
            alt=""
          />
          <div>
            <strong>Thank you</strong>
          </div>
          <p>Thank you for helping to improve this listing!</p>
          <Button
            className="mt-5"
            text="Continue"
            size="small"
            width={270}
            onClick={() => router.push("/")}
          />
        </div>
      </Modal>
    </div>
  )
}

export default AddListing
