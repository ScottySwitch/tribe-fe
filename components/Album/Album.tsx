import Button from "components/Button/Button";
import Checkbox from "components/Checkbox/Checkbox";
import Icon from "components/Icon/Icon";
import Input from "components/Input/Input";
import Modal from "components/Modal/Modal";
import Radio from "components/Radio/Radio";
import ResultModal from "components/ReviewsPage/ResultModal/ResultModal";
import { UserInforContext } from "Context/UserInforContext";
import { get } from "lodash";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import Slider, { Settings } from "react-slick";
import reportApi from "services/report";

import styles from "./Album.module.scss";

interface AlbumProps {
  id?: string;
  listingId?: string | number;
  images?: any[];
  showedPicsNumber?: { slidesToShow: number; slidesToScroll: number };
}

export const Album = (props: AlbumProps) => {
  const {
    id,
    listingId,
    images = [],
    showedPicsNumber = { slidesToShow: 12, slidesToScroll: 12 },
  } = props;

  const [navThumbnail, setNavThumbnail] = useState<any>();
  const [navGallery, setNavGallery] = useState<any>();
  const [isMobile, setIsMobile] = useState(false);
  const [reason, setReason] = useState();
  const [showReportModal, setShowReportModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [submitResult, setSubmitResult] = useState(false);

  const resultType = [
    {
      title: "Success!",
      message:  
        "Thank you for your report. We will review the report and take action within 24 hours!",
      textButton: "Close",
    },
    {
      title: "Fail!",
      message: "Oops, something wrong. Please try again later.",
      textButton: "Try again",
    },
  ];

  const { user } = useContext(UserInforContext);

  const refSlider1 = useRef<any>(null);
  const refSlider2 = useRef<any>(null);

  const handlePrevGallery = () => {
    if (refSlider2 && refSlider2.current) {
      refSlider2.current.slickPrev();
    }
  };
  const handleNextGallery = () => {
    if (refSlider2 && refSlider2.current) {
      refSlider2.current.slickNext();
    }
  };

  const handlePrevThumbnail = () => {
    if (refSlider1 && refSlider1.current) {
      refSlider1.current.slickPrev();
    }
  };

  const handleNextThumbnail = () => {
    if (refSlider1 && refSlider1.current) {
      refSlider1.current.slickNext();
    }
  };

  useEffect(() => {
    setIsMobile(window.innerWidth < 430);
    setNavThumbnail(refSlider1.current);
    setNavGallery(refSlider2.current);
  }, []);

  const configThumbnail: Settings = {
    dots: false,
    arrows: false,
    infinite: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: "linear",
    asNavFor: navGallery,
  };

  const configGallery: Settings = {
    className: styles.slider_gallery_item,
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 3 : showedPicsNumber.slidesToShow,
    slidesToScroll: isMobile ? 3 : showedPicsNumber.slidesToScroll,
    cssEase: "linear",
    focusOnSelect: true,
    asNavFor: navThumbnail,
    adaptiveHeight: true,
  };

  const handleShowReportModal = () => {
    setShowReportModal(true);
  };

  const onSubmit = async () => {
    setShowReportModal(false);
    const body = {
      type: "media",
      reason: reason,
      user: user.id,
      biz_listing: listingId,
    };

    await reportApi
      .createReport(body)
      .then((res) => {
        setSubmitResult(true)
      })
      .catch((error) => {
        setSubmitResult(false)
      })
      .finally(() => {
        setShowReportModal(false)
        setShowResultModal(true)
      });
    };

  return (
    <div className={styles.slider_syncing}>
      <div className={styles.slider_thumbnail_container}>
        <div onClick={handleShowReportModal} className={styles.btn_report}>
          <Icon icon="flag" size={25} color="#FFFFFF" />
        </div>
        <div onClick={handlePrevThumbnail} className={styles.btn_prev}>
          <Icon icon="carret-left" size={40} color="#FFFFFF" />
        </div>
        <Slider
          ref={refSlider1}
          {...configThumbnail}
          className={styles.slider_thumbnail}
        >
          {images?.map((image, index) => (
            <div key={index} className={styles.slider_thumbnail_item}>
              <Image
                src={image}
                layout="fill"
                alt={`thumbnail-${index}`}
                objectFit="contain"
              />
            </div>
          ))}
        </Slider>
        <div onClick={handleNextThumbnail} className={styles.btn_next}>
          <Icon icon="carret-right" size={40} color="#FFFFFF" />
        </div>
      </div>
      <div className={styles.slider_gallery_container}>
        {get(images, "length") > 12 && (
          <div onClick={handlePrevGallery} className={styles.btn_prev}>
            <Icon icon="carret-left" size={30} color="#FFFFFF" />
          </div>
        )}
        <Slider
          ref={refSlider2}
          {...configGallery}
          className={styles.slider_gallery}
        >
          {images?.map((image, index) => (
            <div key={index} className={styles.slider_gallery_item}>
              <Image
                src={image}
                layout="fill"
                alt={`gallery-${index}`}
                objectFit="contain"
              />
            </div>
          ))}
        </Slider>
        {get(images, "length") > 12 && (
          <div onClick={handleNextGallery} className={styles.btn_next}>
            <Icon icon="carret-right" size={30} color="#FFFFFF" />
          </div>
        )}
      </div>
      <Modal
        visible={showReportModal}
        title="Why do you report this photo/video?"
        width={780}
        onClose={() => setShowReportModal(false)}
      >
        <div className="p-[30px] flex flex-col gap-5">
          {reportReasons.map((reason) => (
            <Radio
              id={`${id} - ${reason.label}`}
              key={reason.value}
              label={reason.label}
              value={reason.value}
              name="report-media"
              onChange={(e: any) => setReason(e.target.value)}
            />
          ))}
          <Input
            placeholder="Your reason"
            onChange={(e: any) => setReason(e.target.value)}
            disabled={reason !== reportReasons[5].value}
          />
          <div className="flex justify-end gap-3">
            <Button
              variant="no-outlined"
              text="Cancel"
              width={100}
              onClick={() => setShowReportModal(false)}
            />
            <Button text="Submit" width={150} onClick={onSubmit} />
          </div>
        </div>
      </Modal>
      <ResultModal
        resultType={resultType}
        visible={showResultModal}
        isSuccess={submitResult}
        onClose={() => setShowResultModal(false)}
      />
    </div>
  );
};

const reportReasons = [
  {
    label: "Offensive, hateful or sexually explicit",
    value: "Offensive, hateful or sexually explicit",
  },
  {
    label: "Legal issue",
    value: "Legal issue",
  },
  {
    label: "Privacy concern",
    value: "Privacy concern",
  },
  {
    label: "Poor quality",
    value: "Poor quality",
  },
  {
    label: "Not a photo of the place",
    value: "Not a photo of the place",
  },
  {
    label: "Other",
    value: "Other",
  },
];

export default Album;