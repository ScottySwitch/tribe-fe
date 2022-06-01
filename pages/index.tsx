import Button from "components/Button/Button";
import Carousel from "components/Carousel/Carousel";
import Filter from "components/Filter/Filter";
import InforCard from "components/InforCard/InforCard";
import SectionLayout from "components/SectionLayout/SectionLayout";
import { inforCardList } from "constant";
import type { NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {
  const [showFilter, setShowFilter] = useState(false);
  return (
    <div>
      <Filter onClose={() => setShowFilter(false)} visible={showFilter} />
      <SectionLayout title="Exclusive deals">
        <Button
          size="small"
          text="Filter"
          variant="secondary"
          onClick={() => setShowFilter(true)}
          className="w-[50px] mb-5"
        />
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
