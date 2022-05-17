import type { NextPage } from "next";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  return (
    <div className="flex justify-center">
      <div className={styles.hello}>Hello</div>
    </div>
  );
};

export default Home;
