import axios from "axios"
import classNames from "classnames"
import Icon from "components/Icon/Icon"
import Image from "next/image"
import React, { ReactNode, useState } from "react"
import styles from "./Upload.module.scss"

export interface UploadProps {
  name?: string
  onChange?: (event: string[]) => void
  accept: string
  fileList: any[]
  className?: string
  multiple?: boolean
  centerIcon?: ReactNode
  type?: "avatar" | "cover" | "upload" | "media"
}

const Upload = (props: UploadProps) => {
  const {
    name,
    onChange,
    className,
    centerIcon = <Icon icon="camera" size={40} />,
    multiple,
    accept = "image/*",
    fileList = [],
    type = "upload",
  } = props

  console.log("fileList", fileList)

  const lastItemArray = Array.isArray(fileList) ? fileList.slice(-1) : []
  const initFileList = multiple ? fileList : lastItemArray

  const [srcList, setSrcList] = useState<string[]>(initFileList)

  const handleChange = (event: any) => {
    const file = event.target.files[0]
    const src = URL.createObjectURL(file)
    const newFileList = multiple ? [...srcList, src] : [src]
    setSrcList(newFileList)

    let data = new FormData()
    data.append("files", file)

    axios
      .post("https://services.eastplayers-client.com/api/v1/files/multiple-upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZGNjNjFiLTg0ZjgtNDhkMS04Y2MwLWI1NDY2OTg1OThiNCIsImZ1bGxfbmFtZSI6bnVsbCwiZW1haWwiOiJuYW1lbmFtZUBnbWFpbC5jb20iLCJzY2hlbWEiOiJwdWJsaWMiLCJpYXQiOjE2NTU0MDc1NTksImV4cCI6MTY4Njk0MzU1OX0.mUqlELAL8G5YrK5MA4M_WZeHbQSdbvikU7C4vgPIPaI`,
        },
      })
      .then((res) => {
        if (res.data.urls && Array.isArray(res.data.urls) && res.data.urls.length > 0) {
          alert('Upload successfully!')
          onChange?.([...fileList, ...res.data.urls])
        }
      })
  }

  const showInput = (!multiple && !srcList?.length) || multiple

  const containerClassName = classNames(styles.upload, className, {
    [styles.avatar]: type === "avatar",
    [styles.cover]: type === "cover",
    [styles.media]: type === "media",
  })

  const Input = () => (
    <React.Fragment>
      <div className={styles.add_icon}>{centerIcon}</div>
      <input type="file" name={name} onChange={handleChange} accept={accept} multiple={multiple} />
    </React.Fragment>
  )

  return (
    <div className={containerClassName}>
      {srcList.map(
        (src) =>
          src && (
            <div className={styles.image}>
              <Image src={src} alt="" layout="fill" />
              <Input />
            </div>
          )
      )}
      {showInput && (
        <div className={styles.input}>
          <Input />
        </div>
      )}
    </div>
  )
}

export default Upload
