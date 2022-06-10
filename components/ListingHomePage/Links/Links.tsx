import Icon from "components/Icon/Icon";
import styles from "./Links.module.scss";

const Links = () => {
  return (
    <div className="">
      <div className={styles.heading}>Links</div>
      <div className={styles.social_link_container}>
        <div className={styles.social_link}>
          <div className={styles.social_link_title}>
            <Icon icon="email-color" /> Email
          </div>
          <div className="flex items-center">
            <a>restaurant@gmail.com</a>
          </div>
        </div>
        <div className={styles.social_link}>
          <div className={styles.social_link_title}>
            <Icon icon="web-color" /> Website
          </div>
          <div className="flex items-center">
            <a>www.website.com</a>
          </div>
        </div>
        <div className={styles.social_link}>
          <div className={styles.social_link_title}>
            <Icon icon="socials-color" /> Socials
          </div>
          <div className="flex gap-5">
            <Icon icon="google-logo" size={20} className={styles.icon} />
            <Icon icon="facebook-color" size={20} className={styles.icon} />
            <Icon icon="instagram-color" size={20} className={styles.icon} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Links;
