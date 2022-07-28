import Button from "components/Button/Button";
import Icon from "components/Icon/Icon";
import Input from "components/Input/Input";
import Modal from "components/Modal/Modal";
import React, { useState } from "react";
import styles from "./EditAction.module.scss";
import SelectInput from "components/SelectInput/SelectInput";
import { formattedAreaCodes, phoneAreaCodes } from "constant";
import { useRouter } from "next/router";
import { removeZeroInPhoneNumber } from "utils";

interface EditActionProps {
  isOwned?: boolean;
  isViewPage?: boolean;
  action: { label: string; value: string };
  onApplyAction: (action: string, value: string) => void;
  onPublishPage: () => void;
  isPaid?: boolean;
  isLoading?: boolean;
  klookUrl?: string;
  id?: string;
}

const EditAction = (props: EditActionProps) => {
  const {
    isViewPage,
    isOwned,
    action,
    isPaid,
    isLoading,
    klookUrl,
    id,
    onPublishPage,
    onApplyAction,
  } = props;

  const [showEditActionModal, setShowEditActionModal] = useState(false);
  const [showBuyNow, setShowBuyNow] = useState(false);
  const [showContactUs, setShowContactUs] = useState(false);
  const [showGiftCard, setShowGiftCard] = useState(false);
  const [showBookNow, setShowBookNow] = useState(false);
  const [showStartOrder, setShowStartOrder] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [showWatchVideo, setShowWatchVideo] = useState(false);
  const [showShopOnWebsite, setShowShopOnWebWebsite] = useState(false);
  const [actionValue, setActionValue] = useState("");

  const router = useRouter();

  const actionList = [
    {
      icon: "shop",
      label: "Buy now",
      subLabel: "Choose a website where people can purchase your products.",
      showModalState: showBuyNow,
      type: "url",
      open: () => setShowBuyNow(true),
      close: () => setShowBuyNow(false),
      apply: () => {},
    },
    {
      icon: "voucher",
      label: "View gift card",
      subLabel: "Choose a website where people can purchase your giftcard.",
      showModalState: showGiftCard,
      type: "url",
      open: () => setShowGiftCard(true),
      close: () => setShowGiftCard(false),
      apply: () => {},
    },
    {
      icon: "calendar-2",
      label: "Book now",
      subLabel: "Choose where people can book with you.",
      showModalState: showBookNow,
      type: "url",
      open: () => setShowBookNow(true),
      close: () => setShowBookNow(false),
      apply: () => {},
    },
    {
      icon: "phone-color",
      label: "Contact us",
      subLabel: "Choose where people can find your contact information",
      showModalState: showContactUs,
      type: "phone",
      open: () => setShowContactUs(true),
      close: () => setShowContactUs(false),
      apply: () => {},
    },
    {
      icon: "fork-spoon-color",
      label: "Start order",
      subLabel: "Choose where people can order your food.",
      showModalState: showStartOrder,
      type: "url",
      open: () => setShowStartOrder(true),
      close: () => setShowStartOrder(false),
      apply: () => {},
    },
    {
      icon: "chat",
      label: "Send WhatApps message",
      subLabel:
        "Choose the number associated you with your WhatApps account so people can reach you.",
      showModalState: showWhatsApp,
      type: "phone",
      open: () => setShowWhatsApp(true),
      close: () => setShowWhatsApp(false),
      apply: () => {},
    },
    {
      icon: "info-circle-color",
      label: "Learn more",
      subLabel:
        "Choose a website where people can learn more about what you do",
      showModalState: showLearnMore,
      type: "url",
      open: () => setShowLearnMore(true),
      close: () => setShowLearnMore(false),
      apply: () => {},
    },
    {
      icon: "video-octagon-color",
      label: "Watch video",
      subLabel: "Choose a website where people can find and watch your video",
      showModalState: showWatchVideo,
      type: "url",
      open: () => setShowWatchVideo(true),
      close: () => setShowWatchVideo(false),
      apply: () => {},
    },
    {
      icon: "product",
      label: "Shop on Website",
      subLabel: "Choose a website where people can find your shop",
      showModalState: showShopOnWebsite,
      type: "url",
      open: () => setShowShopOnWebWebsite(true),
      close: () => setShowShopOnWebWebsite(false),
      apply: () => {},
    },
  ];

  const handleApply = (action: string) => {
    onApplyAction(action, actionValue);
  };

  const handleOpenNewWindow = (action) => {
    const { label, value } = action;
    if (["Contact us", "Send WhatApps message"].includes(label)) {
      let phoneNumber = value;
      window.open(`tel:${phoneNumber}`);
    } else {
      let url = value;
      if (url && url.indexOf("//") < 0) url = "https://" + url;
      window.open(url, "_blank")?.focus();
    }
  };

  return (
    <React.Fragment>
      {isViewPage && isPaid && action?.value && (
        <div className={styles.action_modal}>
          <Button
            text={action.label}
            size="small"
            onClick={() => handleOpenNewWindow(action)}
          />
        </div>
      )}
      {isViewPage && !isOwned && (
        <div className={styles.action_modal_not_owned}>
          <Button text="Claim listing" size="small" variant="outlined" />
          Own this business?
        </div>
      )}
      {!isViewPage && (
        <div className={styles.action_modal}>
          <Button
            disabled={!isPaid}
            text={action?.label || "Edit action button"}
            size="small"
            onClick={() => setShowEditActionModal(true)}
          />
          <Button
            isLoading={isLoading}
            variant={isLoading === false ? "outlined" : ""}
            text="Save change"
            size="small"
            onClick={onPublishPage}
          />
        </div>
      )}
      {!isViewPage && !isPaid && (
        <div className={styles.action_modal}>
          <div className="flex gap-3">
            <Icon icon="Group-966" color="#653fff" />
            <div>Upgrade plan</div>
          </div>
          <p className="text-left">
            Upgrade to Basic Tier to access features that help grow your
            business!
          </p>
          <a onClick={() => router.push(`/claim/${id}`)}>Upgrade now</a>
        </div>
      )}
      {klookUrl && (
        <div className={styles.action_modal}>
          <Button
            text="Book on KLOOK"
            size="small"
            onClick={() => window.open(klookUrl, "_blank")?.focus()}
            backgroundColor="#FF5B02"
          />
        </div>
      )}
      <Modal
        title="Edit action button"
        visible={showEditActionModal}
        mobileFullHeight
        width={600}
        onClose={() => {
          setShowEditActionModal(false);
        }}
      >
        <div className={styles.content}>
          <div className={styles.body}>
            <div className={styles.instruction}>
              Choose the action you want your visitor to take
            </div>
            {actionList.map((action) =>
              isPaid === false &&
              action.label === "Send WhatApps message" ? null : (
                <div
                  key={action.label}
                  className={styles.action}
                  onClick={action.open}
                >
                  <div className={styles.icon_container}>
                    <Icon icon={action.icon} size={25} />
                  </div>
                  <div className={styles.label_container}>
                    <div className={styles.label}>{action.label}</div>
                    <div className={styles.sub_label}>{action.subLabel}</div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </Modal>
      {actionList.map((action) =>
        isPaid === false && action.label === "Send WhatApps message" ? null : (
          <Modal
            key={action.label}
            title={action.label}
            visible={action.showModalState}
            width={400}
            mobilePosition="center"
            onClose={action.close}
            containerClassName="overflow-visible"
            contentClassName="overflow-visible"
          >
            <div className="p-[30px] pt-0 flex flex-col items-center w-full gap-5">
              {action.type === "phone" ? (
                <SelectInput
                  id={action.label}
                  label="Phone number"
                  placeholder="your phone number"
                  selectPlaceholder="Area code"
                  options={formattedAreaCodes}
                  shouldControlShowValue
                  onChange={(e) => setActionValue(removeZeroInPhoneNumber(e))}
                />
              ) : (
                <Input
                  placeholder="Insert URL"
                  width="100%"
                  onChange={(e: any) => setActionValue(e.target.value)}
                />
              )}
              <Button
                text="Apply"
                width="100%"
                onClick={() => {
                  action.close();
                  setShowEditActionModal(false);
                  handleApply(action.label);
                }}
              />
            </div>
          </Modal>
        )
      )}
    </React.Fragment>
  );
};

export default EditAction;
