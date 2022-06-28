import { UrlObject } from "url"
import Link from "next/link"
import Icon from "components/Icon/Icon"
import styles from "./CompleteProfileCard.module.scss"
import { useEffect, useState } from "react"

interface ProgressCompleteProps {
  stepCurrent: number
  stepCompleted?: number
}

const ProgressComplete = (props: ProgressCompleteProps) => {
  const { stepCurrent = 0, stepCompleted = 5} = props

  const formatValueProgress = (): string => {
    return (stepCurrent * 100) / stepCompleted + "%"
  }

  return (
    <div className={styles.progress}>
      <div className={styles.progress_completed} style={{width: formatValueProgress()}}></div>
    </div>
  )
}

export interface CompleteProfileCardProps extends ProgressCompleteProps {
  className?: string
  linkLabel?: string
  linkable?: string | UrlObject
}

const CompleteProfileCard = (props: CompleteProfileCardProps) => {
  const {
    className = "",
    stepCurrent,
    stepCompleted,
    linkable = "/",
    linkLabel = "Complete it.",
  } = props
  return (
    <div className={`${className} ${styles.card}`}>
      <ProgressComplete
        stepCurrent={stepCurrent}
        stepCompleted={stepCompleted}
      />
      <div className="flex items-center">
        <Icon icon="like-color-2" className="mr-4"/>
        <div className={styles.note_cta}>
          <span>{`${stepCurrent}/${stepCompleted} `} steps to complete your profile!</span>
          <Link href={linkable}>{linkLabel}</Link>
        </div>
      </div>
    </div>
  )
}

export default CompleteProfileCard