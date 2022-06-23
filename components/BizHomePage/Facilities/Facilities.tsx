import { useState } from "react"

import Button from "components/Button/Button"
import Input from "components/Input/Input"
import Modal from "components/Modal/Modal"
import Heading from "../../Heading/Heading"
import Icon from "components/Icon/Icon"
import Link from "next/link"
import TagsSelection from "components/TagsSelection/TagsSelection"
import { IOption } from "type"

interface FacilitiesProps {
  facilities: IOption[]
  facilityOptions: IOption[]
  onSetFacilities: (facilities: IOption[]) => void
}

const Facilities = (props: FacilitiesProps) => {
  const { facilities = [], facilityOptions, onSetFacilities } = props
  const [showFacilitiesModal, setShowFacilitiesModal] = useState(false)
  const [localFacilities, setLocalFacilities] = useState(facilities)

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <Icon icon="like-color" />
          Facilities
        </div>
        <a onClick={() => setShowFacilitiesModal(true)}>Add facilities</a>
      </div>
      <div className="flex flex-wrap gap-y-2">
        {Array.isArray(facilities) &&
          facilities.map((item) => (
            <div key={item.value} className="mt-3 flex items-center w-full md:w-1/2 lg:w-1/3 pr-1">
              <>
                <Icon icon="checked-circle" /> {item.label}
              </>
            </div>
          ))}
      </div>
      <Modal
        title="Facilities"
        visible={showFacilitiesModal}
        width={500}
        mobilePosition="center"
        onClose={() => {
          setLocalFacilities(facilities)
          setShowFacilitiesModal(false)
        }}
      >
        <TagsSelection
          selectedList={facilities}
          options={facilityOptions}
          onCancel={() => {
            setLocalFacilities(facilities)
            setShowFacilitiesModal(false)
          }}
          onSubmit={(localFacilities) => {
            setLocalFacilities(localFacilities)
            onSetFacilities(localFacilities)
            setShowFacilitiesModal(false)
          }}
        />
      </Modal>
    </div>
  )
}

export default Facilities
