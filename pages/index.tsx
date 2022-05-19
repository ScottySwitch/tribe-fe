import InforCard from "components/InforCard/InforCard";
import SectionLayout from "components/SectionLayout/SectionLayout";
import { inforCardList } from "contants";
import type { NextPage } from "next";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  return (
    <div>
      <SectionLayout title="What to see">
        <div className={styles.card_container}>
          {inforCardList.map((card) => (
            <InforCard
              key={card.title}
              imgUrl={card.imgUrl}
              title={card.title}
              rate={card.rate}
              rateNumber={card.rateNumber}
              followerNumber={card.followerNumber}
              price={card.price}
              categories={card.categories}
              tags={card.tags}
              isVerified={card.isVerified}
            />
          ))}
        </div>
      </SectionLayout>
      <SectionLayout title="What to see">
        <div className={styles.card_container}>
          {inforCardList.map((card) => (
            <InforCard
              key={card.title}
              imgUrl={card.imgUrl}
              title={card.title}
              rate={card.rate}
              rateNumber={card.rateNumber}
              followerNumber={card.followerNumber}
              price={card.price}
              categories={card.categories}
              tags={card.tags}
              isVerified={card.isVerified}
            />
          ))}
        </div>
      </SectionLayout>
    </div>
  );
};

export default Home;
