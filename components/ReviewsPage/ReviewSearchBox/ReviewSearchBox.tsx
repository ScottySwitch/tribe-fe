import { IOption } from "type"
import Button from "components/Button/Button"
import Select from "components/Select/Select"
import styles from  "./ReviewSearchBox.module.scss"

const dummyLocation: IOption[] = [
  {label: "Indonesia", value: "Indonesia"},
  {label: "Singapore", value: "Singapore"},
  {label: "Malaysia", value: "Malaysia"},
  {label: "Japan", value: "Japan"},
  {label: "Thailand", value: "Thailand"},
  {label: "Hong Kong", value: "Hong Kong"},
]

const dummyMina: any = [
  {label: "Minatoso", value: "Kyo Tango, Japan"},
  {label: "Mina Mark", value: "Mexico"},
  {label: "Mina Brasie", value: "Dubai"},
  {label: "MinaBurihako", value: "Lohore, Pakistan"},
]

const ReviewSearchBox = () => {

  return (
    <div className={styles.review_search_box}>
      <div className={styles.title}>{`Review a place you've visited`}</div>
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-2">
          <Select
            prefixIcon="map"
            size="large"
            placeholder="Location"
            options={dummyLocation}
          />
        </div>
        <div className="col-span-2">
          <Select
            prefixIcon="work-color"
            size="large"
            placeholder="Business name"
            options={dummyMina}
          />
        </div>
        <div className="col-auto">
          <Button size="large" text="Search" className={styles.button_search} />
        </div>
      </div>
    </div>
  )
}

export default ReviewSearchBox