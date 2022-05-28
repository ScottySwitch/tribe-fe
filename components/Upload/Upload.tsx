import classNames from "classnames";
import Icon from "components/Icon/Icon";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./Upload.module.scss";

export interface UploadProps {
  name: string;
  onChange?: (event: string[]) => void;
  accept: string;
  fileList: any[];
  className?: string;
  type?: "avatar" | "cover" | "upload";
}

const Upload = (props: any) => {
  const {
    name,
    value,
    onChange,
    onDelete,
    className,
    multiple,
    accept = "image/*",
    fileList = [],
    type = "upload",
  } = props;

  const lastItemArray = Array.isArray(fileList) ? fileList.slice(-1) : [];
  const initFileList = multiple ? fileList : lastItemArray;

  const [srcList, setSrcList] = useState<string[]>(initFileList);

  const handleChange = (event: any) => {
    const src = URL.createObjectURL(event.target.files[0]);
    const newFileList = multiple ? [...srcList, src] : [src];
    setSrcList(newFileList);
  };

  const showInput = (!multiple && !srcList?.length) || multiple;

  const containerClassName = classNames(styles.upload, className, {
    [styles.avatar]: type === "avatar",
    [styles.cover]: type === "cover",
  });

  const Input = () => (
    <React.Fragment>
      <div className={styles.add_icon}>
        <Icon icon="camera" size={40} />
      </div>
      <input
        type="file"
        name={name}
        value={value}
        onChange={handleChange}
        accept={accept}
        multiple={multiple}
      />
    </React.Fragment>
  );

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
  );
};

export default Upload;
