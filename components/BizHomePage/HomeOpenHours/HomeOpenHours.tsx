import { useState } from "react"

import Button from "components/Button/Button"
import Input from "components/Input/Input"
import Modal from "components/Modal/Modal"
import Heading from "../../Heading/Heading"
import Icon from "components/Icon/Icon"
import Link from "next/link"
import { IOption } from "type"
import OpenHours, { IOpenHours } from "components/OpenHours/OpenHours"

interface OpenHoursProps {
  openHours: IOpenHours
  onSetOpenHours: (openHours: IOpenHours) => void
}

const HomeOpenHours = (props: OpenHoursProps) => {
  const { openHours = [], onSetOpenHours } = props
  const [showOpenHoursModal, setShowOpenHoursModal] = useState(false)
  const [localOpenHours, setLocalOpenHours] = useState(openHours)

  const handleCancel = () => {
    setLocalOpenHours(openHours)
    setShowOpenHoursModal(false)
  }

  const handleSubmit = (data) => {
    setShowOpenHoursModal(false)
    onSetOpenHours(data)
  }
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <Icon icon="clock" />
          Opening hours
        </div>
        <a onClick={() => setShowOpenHoursModal(true)}>Add open hours</a>
      </div>
      <div className="flex flex-wrap gap-y-2"></div>
      <Modal
        title="OpenHours"
        visible={showOpenHoursModal}
        width={700}
        mobilePosition="center"
        onClose={handleCancel}
      >
        <OpenHours data={openHours} onCancel={handleCancel} onSubmit={handleSubmit} />
      </Modal>
    </div>
  )
}

export default HomeOpenHours
