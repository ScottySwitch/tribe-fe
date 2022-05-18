import Button from "components/Button/Button";
import Icon from "components/Icon/Icon";
import Input from "components/Input/Input";
import Select from "components/Select/Select";
import type { NextPage } from "next";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  return (
    <div className="flex gap-[10px]">
      <Input placeholder="sss" prefix={<Icon icon="search" size={18} />} />
      <Button text="Click me" />
      <Button text="Click me" variant="outlined" disabled />
      <Select
        size="large"
        placeholder="Choose your role"
        options={[
          { label: "aalksdl", value: "alksdlaksdj" },
          { label: "aalksdl", value: "alksdlaksdj" },
          { label: "aalksdl", value: "alksdlaksdj" },
          { label: "aalksdl", value: "alksdlaksdj" },
        ]}
      />
    </div>
  );
};

export default Home;
