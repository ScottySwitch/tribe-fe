import Button from "components/Button/Button"
import Icon from "components/Icon/Icon"
import Input from "components/Input/Input"
import Modal from "components/Modal/Modal"
import { Item } from "framer-motion/types/components/Reorder/Item"
import React, { useState } from "react"
import styles from "./EditAction.module.scss"

interface EditActionProps {
  action: { label: string; value: string }
  onApplyAction: (action: string, value: string) => void
  onPublishPage: () => void
}

const EditAction = (props: EditActionProps) => {
  const { action, onPublishPage, onApplyAction } = props

  const [showEditActionModal, setShowEditActionModal] = useState(false)
  const [showBuyNow, setShowBuyNow] = useState(false)
  const [showContactUs, setShowContactUs] = useState(false)
  const [showGiftCard, setShowGiftCard] = useState(false)
  const [showBookNow, setShowBookNow] = useState(false)
  const [showStartOrder, setShowStartOrder] = useState(false)
  const [showWhatsApp, setShowWhatsApp] = useState(false)
  const [showLearnMore, setShowLearnMore] = useState(false)
  const [showWatchVideo, setShowWatchVideo] = useState(false)
  const [showShopOnWebsite, setShowShopOnWebWebsite] = useState(false)

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
      subLabel: "Choose a website where people can learn more about what you do",
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
  ]

  const handleApply = (action: string) => {
    const input: any = document.getElementById(action)
    console.log(action, input.value)
    onApplyAction(action, input.value)
  }

  return (
    <React.Fragment>
      <div className={styles.action_modal}>
        <Button
          text={action?.label || "Edit action button"}
          size="small"
          onClick={() => setShowEditActionModal(true)}
        />
        <Button variant="outlined" text="Publish page" size="small" onClick={onPublishPage} />
      </div>
      <Modal
        title="Edit action button"
        visible={showEditActionModal}
        mobileFullHeight
        width={600}
        onClose={() => {
          setShowEditActionModal(false)
        }}
      >
        <div className={styles.content}>
          <div className={styles.body}>
            <div className={styles.instruction}>
              Choose the action you want your visitor to take
            </div>
            {actionList.map((action) => (
              <div key={action.label} className={styles.action} onClick={action.open}>
                <div className={styles.icon_container}>
                  <Icon icon={action.icon} size={25} />
                </div>
                <div className={styles.label_container}>
                  <div className={styles.label}>{action.label}</div>
                  <div className={styles.sub_label}>{action.subLabel}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
      {actionList.map((action) => (
        <Modal
          key={action.label}
          title={action.label}
          visible={action.showModalState}
          width={400}
          mobilePosition="center"
          onClose={action.close}
        >
          <div className="p-[30px] pt-0 flex flex-col items-center w-full gap-5">
            <Input
              id={action.label}
              placeholder={action.type === "phone" ? "Your phone number" : "Insert URL"}
              width="100%"
            />
            <Button
              text="Apply"
              width="100%"
              onClick={() => {
                action.close()
                setShowEditActionModal(false)
                handleApply(action.label)
              }}
            />
          </div>
        </Modal>
      ))}
    </React.Fragment>
  )
}

export default EditAction
