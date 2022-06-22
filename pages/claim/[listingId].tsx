import Button from "components/Button/Button"
import Checkbox from "components/Checkbox/Checkbox"
import Input from "components/Input/Input"
import ListingCard from "components/ListingCard/ListingCard"
import Question from "components/Question/Question"
import SectionLayout from "components/SectionLayout/SectionLayout"
import Select from "components/Select/Select"
import TierTable from "components/TierTable/TierTable"
import { listingSearchResult, loginInforItem, roleList } from "constant"
import { ClaimStep, Tiers } from "enums"
import Link from "next/link"
import Router, { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import BizListingApi from "../../services/biz-listing"

const defaultListing = listingSearchResult[0]

const ClaimListing = (context) => {
  const { firstStep } = context
  const [listing, setListing] = useState<{ [key: string]: any }>({})
  const [claimStep, setClaimStep] = useState(firstStep)
  const { handleSubmit, setValue, getValues, register } = useForm()
  const [isPayYearly, setIsPayYearly] = useState(false)
  const router = useRouter()
  const {
    query: { listingId },
  } = useRouter()

  useEffect(() => {
    const getListingData = async (listingId) => {
      const data = await BizListingApi.getBizListingById(listingId)
      setListing(data.data.data)
    }
    if (listingId) {
      localStorage.setItem("biz_id", listingId.toString())
      getListingData(listingId)
    }
  }, [listingId])

  const agreePolicies = (
    <div>
      I have read and accept Tribes{" "}
      <span style={{ color: "#3faeff" }}>
        <Link href="/terms">Terms of Use</Link>
      </span>{" "}
      and{" "}
      <span style={{ color: "#3faeff" }}>
        <Link href="/policies">Privacy Policy.</Link>
      </span>
    </div>
  )

  const onSubmit = async (form) => {
    console.log(form)
    await BizListingApi.createListingRole({
      bizListingId: listingId,
      name: form.role.value,
    })
    setClaimStep(ClaimStep.CHOOSE_TIER)
    localStorage.setItem("pay_price", "600")
  }

  const handleDirectToVerification = (tier: Tiers) => {
    router.push({
      pathname: "/biz/verify",
      query: {
        isPaid: !(tier === Tiers.FREE),
        tier: tier,
      },
    })
    console.log("asdjaskdjn")
  }

  return (
    <React.Fragment>
      <SectionLayout
        title="Claim your FREE Listing"
        show={claimStep === ClaimStep.CLAIM_FREE_LISTING}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5 sm:w-3/4 w-full">
            <ListingCard listing={listing} />
            <Select
              label="Last name"
              placeholder="Role of business"
              value={getValues("role")}
              options={roleList}
              onChange={(e) => setValue("role", e)}
            />
            <Checkbox
              register={register("getNotified")}
              label="Get notified by email about new reviews, best practices, and more to help you improve your online reputation and build your business."
            />
            <Question question="Please click the statements below to indicate you understand and accept these terms.">
              <Checkbox
                register={register("isAuthorized")}
                label="I certify that I am an authorized representative or affiliate of this establishment and have the authority to register as a business representative. The information I have entered into this form is neither false nor fraudulent. I also understand that Tripadvisor may disclose my name and affiliation to other verified representatives of this establishment."
              />
              <br />
              <Checkbox register={register("agreePolicies")} label={agreePolicies} />
            </Question>
            <Button type="submit" text="Continue" size="small" width={280} />
          </div>
        </form>
      </SectionLayout>
      <SectionLayout
        title="Choose tier"
        subTitle="Choose the tier suitable for your business. You can change tier anytime."
        show={claimStep === ClaimStep.CHOOSE_TIER}
      >
        <TierTable
          isPayYearly={isPayYearly}
          onSetIsPayYearly={(e) => setIsPayYearly(e)}
          onDirectToVerification={handleDirectToVerification}
        />
      </SectionLayout>
    </React.Fragment>
  )
}

export async function getServerSideProps(context) {
  // Pass data to the page via props
  return { props: { firstStep: context.query.firstStep || ClaimStep.CHOOSE_TIER } }
}

export default ClaimListing
