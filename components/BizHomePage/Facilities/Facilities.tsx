import { useState } from "react"

import Modal from "components/Modal/Modal"
import Icon from "components/Icon/Icon"
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

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <Icon icon="like-color" />
          Facilities
        </div>
        <a onClick={() => setShowFacilitiesModal(true)}>Add facilities</a>
      </div>
      <div className="flex flex-wrap mt-5 gap-y-5">
        {Array.isArray(facilities) &&
          facilities.map((item) => (
            <div key={item.value} className="flex gap-2 items-center w-full md:w-1/2 lg:w-1/3 pr-1">
              <Icon icon="checked-circle" size={14} /> {item.label}
            </div>
          ))}
      </div>
      <Modal
        title="Facilities"
        subTitle="Select 5 max"
        visible={showFacilitiesModal}
        width={750}
        mobilePosition="center"
        onClose={() => {
          setShowFacilitiesModal(false)
        }}
      >
        <TagsSelection
          selectedList={facilities}
          options={facilityOptions}
          onCancel={() => {
            setShowFacilitiesModal(false)
          }}
          onSubmit={(localFacilities) => {
            onSetFacilities(localFacilities)
            setShowFacilitiesModal(false)
          }}
        />
      </Modal>
    </div>
  )
}

export default Facilities
