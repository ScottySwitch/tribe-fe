import { useState } from "react"

import Modal from "components/Modal/Modal"
import Icon from "components/Icon/Icon"
import TagsSelection from "components/TagsSelection/TagsSelection"
import { IOption } from "type"
import Button from "components/Button/Button"

interface FacilitiesProps {
  isViewPage?: boolean
  facilities: IOption[]
  facilityOptions: IOption[]
  onSetFacilities: (facilities: IOption[]) => void
}

const Facilities = (props: FacilitiesProps) => {
  const { isViewPage, facilities = [], facilityOptions, onSetFacilities } = props
  const [showFacilitiesModal, setShowFacilitiesModal] = useState(false)
  const showFacilitiesNumber = 10

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <Icon icon="like-color" />
          Facilities
        </div>
        {!isViewPage && <a onClick={() => setShowFacilitiesModal(true)}>Add facilities</a>}
      </div>
      <div className="flex flex-wrap mt-5 gap-y-5">
        {Array.isArray(facilities) &&
          facilities.slice(0, showFacilitiesNumber).map((item) => (
            <div key={item.value} className="flex gap-2 items-center w-full md:w-1/2 lg:w-1/3 pr-1">
              <Icon icon="checked-circle" size={14} /> {item.label}
            </div>
          ))}
      </div>
      {isViewPage && Array.isArray(facilities) && facilities.length > showFacilitiesNumber && (
        <Button
          className="mt-3"
          variant="secondary"
          text="See all facilities"
          width={250}
          onClick={() => setShowFacilitiesModal(true)}
        />
      )}
      <Modal
        title="Facilities"
        subTitle={isViewPage ? "" : "Select 5 max"}
        visible={showFacilitiesModal}
        width={750}
        mobilePosition="center"
        onClose={() => {
          setShowFacilitiesModal(false)
        }}
      >
        {isViewPage ? (
          <div className="p-[30px] pt-0 flex gap-3">
            {Array.isArray(facilities) &&
              facilities.slice(0, showFacilitiesNumber).map((item) => (
                <div
                  key={item.value}
                  className="flex gap-2 items-center w-full md:w-1/2 lg:w-1/3 pr-1"
                >
                  <Icon icon="checked-circle" size={14} /> {item.label}
                </div>
              ))}
          </div>
        ) : (
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
        )}
      </Modal>
    </div>
  )
}

export default Facilities
