import { Button, Input } from "antd";
import Header from "components/header/Header";
import type { NextPage } from "next";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  return (
    <div className="flex justify-center">
      <Header />
      <div className={styles.hello}>Hello</div>
      <Input />
      <Button type="primary">heloo</Button>
    </div>
  );
};

export default Home;
