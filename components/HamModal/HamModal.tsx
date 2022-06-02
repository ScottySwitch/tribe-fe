import Image from "next/image";
import { useRouter } from "next/router";

import Button from "components/Button/Button";
import Menu from "components/Menu/Menu";
import Modal from "components/Modal/Modal";

import styles from "./HamModal.module.scss";
import Tabs from "components/Tabs/Tabs";
import { useState } from "react";
import { categories } from "constant";

const HamModalHeader = ({
  isLoggedIn,
  gotoLogin,
  gotoSignup,
}: {
  isLoggedIn: boolean;
  gotoLogin: () => void;
  gotoSignup: () => void;
}) => {
  return isLoggedIn ? (
    <div className={styles.user_profile}>
      <Image
        src={require("public/images/avatar.png")}
        alt=""
        layout="fixed"
        width={50}
        height={50}
      />
      <div className={styles.user_infor}>
        <div className={styles.name}>Anna Nhun</div>
        <div className={styles.see_profile}>See profile</div>
      </div>
    </div>
  ) : (
    <>
      <div className={styles.banner} />
      <div className={styles.button_container}>
        <Button text="Sign up" variant="outlined" onClick={gotoSignup} />
        <Button text="Login" onClick={gotoLogin} />
      </div>
    </>
  );
};

export interface HamModalProps {
  isLoggedIn: boolean;
  showHamModal: boolean;
  onSetShowHamModal: (e: boolean) => void;
}

const HamModal = (props: HamModalProps) => {
  const { onSetShowHamModal, isLoggedIn, showHamModal } = props;

  const [showCategoriesModal, setShowCategoriesModal] = useState(false);

  const router = useRouter();

  const gotoLogin = () => {
    onSetShowHamModal(false);
    router.push("/login");
  };

  const gotoSignup = () => {
    onSetShowHamModal(false);
    router.push("/signup");
  };

  const categoriesTabs = [
    {
      icon: "buy-color",
      label: "Buy",
      value: "buy",
      content: (
        <div className="flex gap-[20px] flex-wrap">
          {categories[0].options.map((item) => (
            <div key={item.value} className="flex flex-col flex-wrap w-[28%]">
              <div>
                <Image
                  src={"https://picsum.photos/200/300"}
                  alt=""
                  layout="fixed"
                  width={50}
                  height={50}
                  style={{ borderRadius: "50%" }}
                />
              </div>
              <div>{item.label}</div>
            </div>
          ))}
        </div>
      ),
    },
    {
      icon: "eat-color",
      label: "Eat",
      value: "eat",
      content: (
        <div className="flex gap-[20px] flex-wrap">
          {categories[1].options.map((item) => (
            <div key={item.value} className="flex flex-col flex-wrap w-[28%]">
              <div>
                <Image
                  src={"https://picsum.photos/200/300"}
                  alt=""
                  layout="fixed"
                  width={50}
                  height={50}
                  style={{ borderRadius: "50%" }}
                />
              </div>
              <div>{item.label}</div>
            </div>
          ))}
        </div>
      ),
    },
    {
      icon: "camera-color",
      label: "See & Do",
      value: "see-and-do",
      content: (
        <div className="flex gap-[20px] flex-wrap">
          {categories[2].options.map((item) => (
            <div key={item.value} className="flex flex-col flex-wrap w-[28%]">
              <div>
                <Image
                  src={"https://picsum.photos/200/300"}
                  alt=""
                  layout="fixed"
                  width={50}
                  height={50}
                  style={{ borderRadius: "50%" }}
                />
              </div>
              <div>{item.label}</div>
            </div>
          ))}
        </div>
      ),
    },
    {
      icon: "car-color",
      label: "Transport",
      value: "transport",
      content: (
        <div className="flex gap-[20px] flex-wrap">
          {categories[3].options.map((item) => (
            <div key={item.value} className="flex flex-col flex-wrap w-[28%]">
              <div>
                <Image
                  src={"https://picsum.photos/200/300"}
                  alt=""
                  layout="fixed"
                  width={50}
                  height={50}
                  style={{ borderRadius: "50%" }}
                />
              </div>
              <div>{item.label}</div>
            </div>
          ))}
        </div>
      ),
    },
    {
      icon: "bed-color",
      label: "Stay",
      value: "stay",
      content: (
        <div className="flex gap-[20px] flex-wrap">
          {categories[4].options.map((item) => (
            <div key={item.value} className="flex flex-col flex-wrap w-[28%]">
              <div>
                <Image
                  src={"https://picsum.photos/200/300"}
                  alt=""
                  layout="fixed"
                  width={50}
                  height={50}
                  style={{ borderRadius: "50%" }}
                />
              </div>
              <div>{item.label}</div>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <>
      <Modal
        visible={showHamModal}
        mobileFullHeight
        mobilePosition="right"
        onClose={() => onSetShowHamModal(false)}
      >
        <div className={styles.ham_modal}>
          <HamModalHeader
            isLoggedIn={isLoggedIn}
            gotoLogin={gotoLogin}
            gotoSignup={gotoSignup}
          />
          <Menu
            isLoggedIn={isLoggedIn}
            mobile
            onShowCategoriesModal={() => setShowCategoriesModal(true)}
          />
        </div>
      </Modal>
      <Modal
        visible={showCategoriesModal}
        onClose={() => setShowCategoriesModal(false)}
        title="Filter & Sort"
        width="100%"
        mobileFullHeight
        mobilePosition="right"
      >
        <Tabs tabList={categoriesTabs} />
      </Modal>
    </>
  );
};

export default HamModal;
