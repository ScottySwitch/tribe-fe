import Button from "components/Button/Button";
import Switch from "components/Switch/Switch";
import Link from "next/link";
import styles from "./TierTable.module.scss";

const ProvidedFeature = () => (
  <div
    style={{
      backgroundColor: "#3FAEFF",
      borderRadius: "50%",
      width: 20,
      height: 20,
    }}
  />
);

const tableData = [
  {
    feature: "Uploading of photos on banner",
    free: "Maximum 3",
    basic: "Unlimited",
    premium: "",
  },
  {
    feature: "Add/Edit Basic Info",
    free: <ProvidedFeature />,
    basic: <ProvidedFeature />,
    premium: "",
  },
  {
    feature: "Customer can follow store",
    free: <ProvidedFeature />,
    basic: <ProvidedFeature />,
    premium: "",
  },
  {
    feature: "Verified badge",
    free: "",
    basic: <ProvidedFeature />,
    premium: "",
  },
  {
    feature: "Add/Edit Premium Info",
    free: "",
    basic: <ProvidedFeature />,
    premium: "",
  },
  {
    feature: "Reply to review",
    free: <ProvidedFeature />,
    basic: <ProvidedFeature />,
    premium: "",
  },
  {
    feature: "Analytics",
    free: "Basic",
    basic: "Advance",
    premium: "",
  },
  {
    feature: "Uploading products",
    free: "",
    basic: "Unlimited",
    premium: "",
  },
  {
    feature: "Uploading menu",
    free: "",
    basic: "Unlimited",
    premium: "",
  },
  {
    feature: "Create deals for customer",
    free: "",
    basic: <ProvidedFeature />,
    premium: "",
  },
  {
    feature: "Connect with customer through chat system",
    free: "",
    basic: <ProvidedFeature />,
    premium: "",
  },
];

const tiers = [
  {
    name: "Free Tier",
    price: "SGD 0",
    demo: "free",
    value: "free",
    button: (
      <Button
        variant="outlined"
        className="mt-3"
        text="Select"
        width="70%"
        size="small"
      />
    ),
  },
  {
    name: "Basic Tier",
    price: "SGD 150",
    demo: "basic",
    value: "basic",
    button: <Button className="mt-3" text="Select" width="70%" size="small" />,
  },
];

const TierTable = () => {
  return (
    <table className={styles.tier}>
      <colgroup>
        <col width="34%" />
        <col width="23%" />
        <col width="23%" style={{ backgroundColor: "#ECF7FF" }} />
        <col width="20%" />
      </colgroup>
      <thead>
        <th className={styles.tier_payment}>
          <span>Pay quarterly</span>
          <Switch />
          <span>Pay yearly</span>
        </th>
        {tiers.map((tier) => (
          <th key={tier.name}>
            <div className={styles.tier_name}>{tier.name}</div>
            <div className={styles.tier_price}>
              {tier.price}
              <span> per quarter</span>
            </div>
            <Link href={"/"}>View Demo page</Link>
            {tier.button}
          </th>
        ))}
        <th>
          <div className={styles.tier_name}>Premium Tier</div>
          <div className={styles.tier_price}>
            <span>Comming soon</span>
          </div>
        </th>
      </thead>
      {tableData.map((row) => (
        <tr key={row.feature}>
          <td className={styles.tier_feature}>{row.feature}</td>
          <td>{row.free}</td>
          <td>{row.basic}</td>
          <td>{row.premium}</td>
        </tr>
      ))}
    </table>
  );
};

export default TierTable;
