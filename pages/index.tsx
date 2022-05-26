import Carousel from "components/Carousel/Carousel";
import Filter from "components/Filter/Filter";
import InforCard from "components/InforCard/InforCard";
import SectionLayout from "components/SectionLayout/SectionLayout";
import { inforCardList } from "contants";
import type { NextPage } from "next";
import { useState } from "react";

import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  const [showFilter, setShowFilter] = useState(false);
  return (
    <div>
      {/* <div onClick={() => setShowFilter(true)}>Filter</div>
      <Filter onClose={() => setShowFilter(false)} visible={showFilter} /> */}
      <SectionLayout title="Exclusive deals">
        <Carousel>
          {inforCardList?.map((card) => (
            <div key={card.title} className="pb-5">
              <InforCard
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
            </div>
          ))}
        </Carousel>
      </SectionLayout>
      <SectionLayout title="Where to BUY">
        <Carousel>
          {inforCardList?.map((card) => (
            <div key={card.title} className="pb-5">
              <InforCard
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
            </div>
          ))}
        </Carousel>
      </SectionLayout>
      <SectionLayout title="What to SEE">
        <Carousel>
          {inforCardList?.map((card) => (
            <div key={card.title} className="pb-5">
              <InforCard
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
            </div>
          ))}
        </Carousel>
      </SectionLayout>
      <SectionLayout title="What to EAT">
        <Carousel>
          {inforCardList?.map((card) => (
            <div key={card.title} className="pb-5">
              <InforCard
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
            </div>
          ))}
        </Carousel>
      </SectionLayout>
    </div>
  );
};

export default Home;
