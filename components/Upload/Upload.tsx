import axios from "axios";
import classNames from "classnames";
import Icon from "components/Icon/Icon";
import { get } from "lodash";
import Image from "next/image";
import React, { ReactNode, useEffect, useState } from "react";
import styles from "./Upload.module.scss";

export interface UploadProps {
  name?: string;
  onChange?: (event: string[]) => void;
  accept?: string;
  fileList?: any[];
  className?: string;
  disabled?: boolean;
  multiple?: boolean;
  centerIcon?: ReactNode;
  type?: "avatar" | "cover" | "upload" | "media" | "banner";
  isPaid?: boolean;
}

const Upload = (props: UploadProps) => {
  const {
    name,
    onChange,
    className,
    centerIcon = <Icon icon="camera" size={40} />,
    multiple,
    disabled,
    accept = "image/*, video/*",
    fileList = [],
    type = "media",
    isPaid,
  } = props;
  const lastItemArray = Array.isArray(fileList) ? fileList.slice(-1) : [];
  const initFileList = multiple ? fileList : lastItemArray;

  const [srcList, setSrcList] = useState<string[]>(initFileList);
  const [localFileList, setLocalFileList] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleChange = (event: any, src?: any) => {
    const imgIndex: any = srcList.indexOf(src);
    console.log(imgIndex);

    const files: Blob[] = Object.values(event.target.files);
    const srces = files?.map((file) => URL.createObjectURL(file));
    let newFileList = [...srcList];

    if (!multiple) {
      newFileList = [...srces];
    } else if (imgIndex !== -1) {
      newFileList[imgIndex] = srces[0];
    } else {
      newFileList = [...newFileList, ...srces];
    }

    setSrcList(newFileList);

    setIsUploading(true);
    let data = new FormData();
    files.forEach((file) => {
      data.append("files", file);
    });

    axios
      .post(
        "https://services.eastplayers-client.com/api/v1/files/multiple-upload",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZGNjNjFiLTg0ZjgtNDhkMS04Y2MwLWI1NDY2OTg1OThiNCIsImZ1bGxfbmFtZSI6bnVsbCwiZW1haWwiOiJuYW1lbmFtZUBnbWFpbC5jb20iLCJzY2hlbWEiOiJwdWJsaWMiLCJpYXQiOjE2NTU0MDc1NTksImV4cCI6MTY4Njk0MzU1OX0.mUqlELAL8G5YrK5MA4M_WZeHbQSdbvikU7C4vgPIPaI`,
          },
        }
      )
      .then((res) => {
        if (get(res, "data.urls.length") > 0) {
          setLocalFileList([...fileList, ...res.data.urls]);
          onChange?.([...fileList, ...res.data.urls]);
        }
      })
      .finally(() => setIsUploading(false));
  };

  const showInput =
    ((!multiple && !srcList?.length) || multiple) &&
    (isPaid || (!isPaid && srcList.length < 3));

  const containerClassName = classNames(styles.upload, className, {
    [styles.avatar]: type === "avatar",
    [styles.cover]: type === "cover",
    [styles.media]: type === "media",
    [styles.banner]: type === "banner",
    [styles.disabled]: disabled,
  });

  const Input = ({ onChange }) => (
    <input
      disabled={disabled || isUploading}
      type="file"
      name={name}
      accept={accept}
      multiple={multiple}
      onChange={onChange}
    />
  );

  const handleRemoveItem = (src) => {
    const imgIndex: any = srcList.indexOf(src);
    const newSrcList = [...srcList].filter((item) => item !== src);
    const newFileList = [...localFileList].filter(
      (item, index) => imgIndex !== index
    );
    setSrcList(newSrcList);
    setLocalFileList(newFileList);
    onChange?.(newFileList);
  };

  const imageClassName = classNames(styles.image, {
    [styles.uploading]: isUploading,
  });

  return (
    <div className={containerClassName}>
      {Array.isArray(srcList) &&
        srcList.map((src) => (
          <div key={src} className={imageClassName}>
            <div className={styles.close} onClick={() => handleRemoveItem(src)}>
              <Icon icon="cancel" size={25} />
            </div>
            <div className={styles.add_icon}>{centerIcon}</div>
            <div className={styles.loader} />
            <Image src={src} alt="" layout="fill" />
            <Input onChange={(e) => handleChange(e, src)} />
          </div>
        ))}

      {showInput && !isUploading && (
        <div className={classNames(styles.input)}>
          <div className={styles.add_icon}>{centerIcon}</div>
          <Input onChange={handleChange} />
        </div>
      )}

      {type === "media" && !isPaid && get(srcList, "length") > 2 && (
        <div className={styles.upgrade_now}>
          <div className={styles.tips}>
            <Icon icon="Group-966" color="#653fff" /> Tips
          </div>
          <div className={styles.upgrade}>
            Upgrade to Basic Tier to upload more photos and video
          </div>
          <a>Upgrade now</a>
        </div>
      )}
    </div>
  );
};

export default Upload;
