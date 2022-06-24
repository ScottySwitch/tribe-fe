import Break from "components/Break/Break"
import Button from "components/Button/Button"
import Icon from "components/Icon/Icon"
import Upload from "components/Upload/Upload"
import { ListingHomePageScreens } from "enums"
import { useState } from "react"

import styles from "./AddMenu.module.scss"

interface AddItemsProps {
  isPaid?: boolean
  menu?: string[]
  onCancel: () => void
  onSubmit: (fileList: string[]) => void
}

const AddMenu = (props: AddItemsProps) => {
  const { isPaid, menu, onCancel, onSubmit } = props

  const [fileList, setFileList] = useState<string[]>(menu || [])

  const CancelButton = () => (
    <Button
      variant="secondary-no-outlined"
      text="Cancel"
      width={50}
      size="small"
      onClick={onCancel}
    />
  )

  return (
    <div>
      <Break />
      <Upload
        isPaid={isPaid}
        multiple
        centerIcon={<Icon icon="plus" size={20} />}
        fileList={fileList}
        onChange={(list) => setFileList(list)}
      />
      <Break />
      <div className="flex gap-5">
        <CancelButton />
        <Button text="Create Menu" width={280} size="small" onClick={() => onSubmit(fileList)} />
      </div>
    </div>
  )
}

export default AddMenu
