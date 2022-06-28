import classNames from "classnames"
import styles from "./Break.module.scss"

interface BreakProps {
  show?: boolean
}

const Break = ({ show = true }: BreakProps) => {
  const breakClassNames = classNames(styles.break, { [styles.no_border]: !show })

  return <div className={breakClassNames} />
}

export default Break
