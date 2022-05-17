import Icon from "components/Icon/Icon";
import Input from "components/Input/Input";
import type { NextPage } from "next";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  return (
    <div className="flex justify-end">
      <Input
        size="small"
        placeholder="sss"
        variant="filled"
        prefix={<Icon icon="search" size={18} />}
      />
    </div>
  );
};

export default Home;
