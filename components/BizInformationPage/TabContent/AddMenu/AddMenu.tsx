import Break from "components/Break/Break"
import Button from "components/Button/Button"
import Icon from "components/Icon/Icon"
import Upload from "components/Upload/Upload"
import { ListingHomePageScreens } from "enums"

import styles from "./AddMenu.module.scss"

interface AddItemsProps {
  onSetScreen: (e: ListingHomePageScreens) => void
}

const AddMenu = (props: AddItemsProps) => {
  const { onSetScreen } = props

  const CancelButton = () => (
    <Button
      variant="secondary-no-outlined"
      text="Cancel"
      width={50}
      size="small"
      onClick={() => onSetScreen(ListingHomePageScreens.HOME)}
    />
  )

  return (
    <div className=" w-full sm:w-3/4 lg:w-1/2">
      <Break />
      <Upload className={styles.upload} centerIcon={<Icon icon="plus" size={20} />} />
      <Break />
      <div className="flex gap-5">
        <CancelButton />
        <Button
          text="Create Menu"
          width={280}
          size="small"
          onClick={() => onSetScreen(ListingHomePageScreens.HOME)}
        />
      </div>
    </div>
  )
}

export default AddMenu
