import classNames from "classnames"
import Button from "components/Button/Button"
import Icon from "components/Icon/Icon"
import Switch from "components/Switch/Switch"
import { Tiers } from "enums"
import { Item } from "framer-motion/types/components/Reorder/Item"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import styles from "./TierTable.module.scss"

const ProvidedFeature = () => <div className={styles.feature} />

const tableData = [
  {
    feature: "Uploading of photos on banner",
    free: "Maximum 3",
    basic: "Unlimited",
    premium: null,
  },
  {
    feature: "Add/Edit Basic Info",
    free: <ProvidedFeature />,
    basic: <ProvidedFeature />,
    premium: null,
  },
  {
    feature: "Customer can follow store",
    free: <ProvidedFeature />,
    basic: <ProvidedFeature />,
    premium: null,
  },
  {
    feature: "Verified badge",
    free: null,
    basic: <ProvidedFeature />,
    premium: null,
  },
  {
    feature: "Add/Edit Premium Info",
    free: null,
    basic: <ProvidedFeature />,
    premium: null,
  },
  {
    feature: "Reply to review",
    free: <ProvidedFeature />,
    basic: <ProvidedFeature />,
    premium: null,
  },
  {
    feature: "Analytics",
    free: Tiers.BASIC,
    basic: "Advance",
    premium: null,
  },
  {
    feature: "Uploading products",
    free: null,
    basic: "Unlimited",
    premium: null,
  },
  {
    feature: "Uploading menu",
    free: null,
    basic: "Unlimited",
    premium: null,
  },
  {
    feature: "Create deals for customer",
    free: null,
    basic: <ProvidedFeature />,
    premium: null,
  },
  {
    feature: "Connect with customer through chat system",
    free: null,
    basic: <ProvidedFeature />,
    premium: null,
  },
]

const tiers = [
  {
    name: "Free Tier",
    price: "SGD 0",
    demo: Tiers.FREE,
    value: Tiers.FREE,
    description:
      "With simple features to help you get the ball rolling. Suitable for small business.",
    button: <Button variant="outlined" text="Select" width="70%" size="small" />,
  },
  {
    name: "Basic Tier",
    price: "SGD 150",
    demo: Tiers.BASIC,
    description:
      "With advance features to help you promote your business. Suitable for medium and large business.",
    value: Tiers.BASIC,
    recommended: true,
    button: <Button text="Select" width="70%" size="small" />,
  },
]

const DesktopTierTable = ({
  onDirectToVerification,
}: {
  onDirectToVerification(tier: Tiers): void
}) => {

  const handleChangePayPrice = () => {
    console.log(localStorage.getItem('pay_price'));
  }

  return (
    <table>
      <colgroup>
        <col width="34%" />
        <col width="23%" />
        <col width="23%" style={{ backgroundColor: "#ECF7FF" }} />
        <col width="20%" />
      </colgroup>
      <thead>
        <tr>
          <th className={styles.tier_payment}>
            <span>Pay quarterly</span>
            <div onClick={handleChangePayPrice}>
              <Switch />
            </div>
            <span>Pay yearly</span>
          </th>
          {tiers.map((tier) => (
            <th key={tier.name}>
              <div className={styles.tier_name}>{tier.name}</div>
              <div className={styles.tier_price}>
                {tier.price}
                <span> per quarter</span>
              </div>
              <div>
                <Link href={"/"}>View Demo page</Link>
              </div>
              <br />
              <Button
                variant={tier.value === Tiers.FREE ? "outlined" : "primary"}
                text="Select"
                width="70%"
                size="small"
                onClick={() => onDirectToVerification(tier.value)}
              />
            </th>
          ))}
          <th>
            <div className={styles.tier_name}>Premium Tier</div>
            <div className={styles.tier_price}>
              <span>Comming soon</span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row) => (
          <tr key={row.feature}>
            <td className={styles.tier_feature}>{row.feature}</td>
            <td>{row.free}</td>
            <td>{row.basic}</td>
            <td>{row.premium}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const MobileTierTable = ({
  onDirectToVerification,
}: {
  onDirectToVerification(tier: Tiers): void
}) => {
  const [tierList, setTierList] = useState<string[]>([])
  return (
    <div className={styles.tier_mobile}>
      <Switch /> Pay yearly
      {tiers.map((tier) => (
        <div key={tier.name} className="relative mt-10">
          {tier.recommended && (
            <div className={styles.recommended}>
              <Image
                src={require("public/images/recommended.svg")}
                alt=""
                layout="fixed"
                height={37}
              />
            </div>
          )}
          <div className={styles.tier_mobile_card}>
            <div className={styles.body}>
              <div className={styles.name}>{tier.name}</div>
              <span>{tier.description}</span>
              <div className={styles.price}>
                <div>
                  {tier.price} <span>per quarter</span>
                </div>
                <a onClick={() => setTierList([...tierList, tier.name])}>View detail</a>
              </div>
            </div>
            {tierList.includes(tier.name) && (
              <div className={styles.features}>
                {tableData.map((feat) => {
                  const notProvided = !feat[tier.value]
                  const featureClassName = classNames(styles.feature, {
                    [styles.no_provided]: notProvided,
                  })
                  return (
                    <div key={feat.feature} className={featureClassName}>
                      <Image
                        src={require(notProvided
                          ? "public/images/x-mark.svg"
                          : "public/images/check-mark.svg")}
                        alt=""
                        layout="fixed"
                        width={14}
                        height={14}
                      />
                      {feat.feature}
                    </div>
                  )
                })}
              </div>
            )}
            <div className={styles.button_container}>
              <Button
                variant={tier.value === Tiers.FREE ? "outlined" : "primary"}
                text="Select"
                width="70%"
                size="small"
                onClick={() => onDirectToVerification(tier.value)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

const TierTable = ({ onDirectToVerification }: { onDirectToVerification(tier: Tiers): void }) => {
  return (
    <div className={styles.tier}>
      <DesktopTierTable onDirectToVerification={onDirectToVerification} />
      <MobileTierTable onDirectToVerification={onDirectToVerification} />
    </div>
  )
}

export default TierTable
