import styles from "./DividerSection.module.scss"

interface IDividerSection {
  className?: string
  title?: string
}

const DividerSection = (props: IDividerSection) => {
  const { title, className } = props

  return (
    <div className={`${styles.divider_section} ${className}`}>
      <h2 className={`${styles.divider_section_title} uppercase text-center font-extrabold`}>{title || 'Title'}</h2>
    </div>
  )
}

export default DividerSection
