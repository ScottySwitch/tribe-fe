import Button from "components/Button/Button";
import Checkbox from "components/Checkbox/Checkbox";
import Icon from "components/Icon/Icon";
import SectionLayout from "components/SectionLayout/SectionLayout";
import Upload from "components/Upload/Upload";
import Image from "next/image";
import Link from "next/link";

import styles from "styles/ListingHomepage.module.scss";

const CenterIcon = () => (
  <div className="flex flex-col items-center gap-1">
    <Icon icon="camera-color" size={40} />
    <p>Add photos/ videos</p>
  </div>
);

const checklist = [
  { label: "Add profile photo" },
  { label: "Add open time" },
  { label: "Add at least 1 photos of your business" },
  { label: "Add price range" },
  { label: "Add social page" },
];

const EditListingHomepage = () => {
  return (
    <SectionLayout className={styles.listing_homepage}>
      <Upload className={styles.banner} centerIcon={<CenterIcon />} />
      <div className={styles.breadcrumbs}>
        Home <Icon icon="carret-right" size={14} color="#7F859F" />
        Evertop Hainanese Boneless Chicken
      </div>
      <div className={styles.body}>
        <div className={styles.right_col}></div>
        <div className={styles.left_col}>
          <div className={styles.listing_infor}>
            <div className={styles.avatar}>
              <Image src={require("public/logo.svg")} layout="fill" alt="" />
            </div>
            <div className={styles.detail}>
              <div className={styles.name}>Evertop Hainanese Boneless Chicken</div>
              <div className={styles.contact}>
                <div className={styles.contact_left}>
                  <Icon icon="map" size={20} />
                  50 Bussorah St, Singapore 199466
                </div>
                <div className={styles.contact_right}>
                  <Icon icon="call" size={20} />
                  06-6777-9529
                </div>
                <div className={styles.contact_left}>
                  <Icon icon="tags-color" size={20} />
                  <a>Add price range</a>
                </div>
                <div className={styles.contact_right}>
                  <Icon icon="web-color" size={20} />
                  <a>Add social media</a>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.break} />
          <div className={styles.onboard_checklist}>
            <div className={styles.onboard_checklist_header}>
              <div className={styles.onboard_checklist_header_title}>Onboarding Checklist</div>
              <div className={styles.onboard_checklist_header_progress}>
                60% to finish your profile
              </div>
            </div>
            <div className={styles.progress_bar} />
            <div className={styles.checkbox_container}>
              {checklist.map((item) => (
                <Checkbox
                  key={item.label}
                  className={styles.checkbox}
                  label={item.label}
                  value={item.label}
                />
              ))}
            </div>
          </div>
          <div className={styles.break} />
          <div className="flex justify-between items-center">
            <div className={styles.heading}>Details</div>
            <Link href="/">Add description</Link>
          </div>
          <div className={styles.break} />
          <div className="flex justify-between">
            <div className="flex items-center gap-1">
              <Icon icon="like-color" />
              Facilities
            </div>
            <Link href="/">Add facilities</Link>
          </div>
          <div className={styles.break} />
          <div className="flex justify-between">
            <div className="flex items-center gap-1">
              <Icon icon="tags-color" />
              Tags
            </div>
            <Link href="/">Add tags</Link>
          </div>
          <div className={styles.break} />
          <div className="flex justify-between">
            <div className="flex items-center gap-1">
              <Icon icon="clock" />
              Opening hours
            </div>
            <Link href="/">Add opening hours</Link>
          </div>
          <div className={styles.break} />
          <div>
            <div className="flex gap-5 items-center">
              <div className={styles.heading}>Products</div>
              <div className={styles.heading}>Menus</div>
              <div className={styles.heading}>Deals</div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Image src={require("public/images/no-dish.svg")} width={100} alt="" />
              <p>There are no dish yet</p>
              <Button text="Add dish now" size="small" width={300} className="my-5" />
            </div>
          </div>
          <div className={styles.break} />
          <div>
            <div className={styles.heading}>Reviews</div>
            <div className="flex flex-col items-center justify-center">
              <Image src={require("public/images/no-review.svg")} width={100} alt="" />
              <p>There are no review yet</p>
            </div>
          </div>
          <div className={styles.break} />
          <div className="">
            <div className={styles.heading}>Links</div>
            <div className="flex gap-10 mt-5">
              <div>
                <div className="flex gap-3">
                  <Icon icon="email-color" /> Email
                </div>
                <div className="flex items-center h-[50px]">
                  <a>restaurant@gmail.com</a>
                </div>
              </div>
              <div>
                <div className="flex gap-3">
                  <Icon icon="socials-color" /> Socials
                </div>
                <div className="flex gap-5 mt-[10px]">
                  <Icon icon="google-logo" size={20} className={styles.icon} />
                  <Icon icon="facebook-color" size={20} className={styles.icon} />
                  <Icon icon="instagram-color" size={20} className={styles.icon} />
                </div>
              </div>
              <div>
                <div className="flex gap-3">
                  <Icon icon="web-color" /> Website
                </div>
                <div className="flex items-center h-[50px]">
                  <a>www.website.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
};

export default EditListingHomepage;
