import InforCard from "components/InforCard/InforCard";
import type { NextPage } from "next";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  return (
    <div className="flex gap-[10px] p-10">
      <InforCard
        imgUrl="https://picsum.photos/200/300"
        title="Evertop Hainanese Boneless Chicken"
        rate={4.5}
        rateNumber={25}
        followerNumber={500}
        price={"$37.35"}
        categories={["Fast food", "Desserts"]}
        tags={["Hot deals", "Best sellers"]}
        isVerified
      />
    </div>
  );
};

export default Home;
