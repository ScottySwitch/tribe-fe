import ArticleCard from "components/ArticleCard/ArticleCard"
import Button from "components/Button/Button"
import Carousel from "components/Carousel/Carousel"
import CollectionCard from "components/CollectionCard/CollectionCard"
import Filter from "components/Filter/Filter"
import Icon from "components/Icon/Icon"
import InforCard from "components/InforCard/InforCard"
import SectionLayout from "components/SectionLayout/SectionLayout"
import TopSearches from "components/TopSearches/TopSearches"
import {
  categories,
  curatedList,
  dummyTopSearchKeywords,
  homeArticleCarousel,
  homeBannerResponsive,
  homeCarousel,
  homeCuratedCarousel,
  homeCuratedResponsive,
  infoCardResponsive,
  inforCardList,
} from "constant"
import useTrans from "hooks/useTrans"
import type { NextPage } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"

import styles from "styles/Home.module.scss"

const Home: NextPage = () => {
  const [showFilter, setShowFilter] = useState(false)
  const trans = useTrans()
  const router = useRouter()

  return (
    <div>
      <Filter onClose={() => setShowFilter(false)} visible={showFilter} />
      <SectionLayout>
        <Carousel responsive={homeBannerResponsive}>
          {homeCarousel?.map((img, index) => (
            <div key={index} className={styles.banner_card}>
              <Image alt="" layout="fill" src={img.imgUrl} />
            </div>
          ))}
        </Carousel>
      </SectionLayout>
      <SectionLayout title="Explore BESTS" childrenClassName={styles.bests}>
        {categories.map((item, index) => (
          <div key={index} className={styles.category} onClick={() => router.push(item.slug)}>
            <div className={styles.category_icon}>
              <Icon size={60} icon={item.icon} />
            </div>
            <div className={styles.category_label}>{item.label}</div>
          </div>
        ))}
      </SectionLayout>
      <SectionLayout title="Exclusive deals">
        <Button
          size="small"
          text={trans.filter}
          variant="secondary"
          onClick={() => setShowFilter(true)}
          className="w-[50px] mb-5"
        />
        <Carousel responsive={infoCardResponsive}>
          {inforCardList?.map((card) => (
            <div key={card.title} className="pb-5">
              <InforCard
                imgUrl={card.images[0]}
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
      <SectionLayout backgroundColor title="Specially Curated For You">
        <Carousel responsive={homeCuratedResponsive}>
          {homeCuratedCarousel?.map((item, index) => (
            <div key={index} className="pb-5">
              <CollectionCard title={item.title} imgUrl={item.imgUrl} />
            </div>
          ))}
        </Carousel>
      </SectionLayout>
      <SectionLayout title="Where to BUY">
        <Carousel responsive={infoCardResponsive}>
          {inforCardList?.map((card) => (
            <div key={card.title} className="pb-5">
              <InforCard
                imgUrl={card.images[0]}
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
        <Carousel responsive={infoCardResponsive}>
          {inforCardList?.map((card) => (
            <div key={card.title} className="pb-5">
              <InforCard
                imgUrl={card.images[0]}
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
      <SectionLayout backgroundColor title="Featured Articles">
        <Carousel responsive={homeCuratedResponsive}>
          {homeArticleCarousel?.map((item, index) => (
            <div key={index} className="pb-5">
              <ArticleCard title={item.title} imgUrl={item.imgUrl} time={item.time} />
            </div>
          ))}
        </Carousel>
      </SectionLayout>
      <SectionLayout title="What to EAT">
        <Carousel responsive={infoCardResponsive}>
          {inforCardList?.map((card) => (
            <div key={card.title} className="pb-5">
              <InforCard
                imgUrl={card.images[0]}
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
      <SectionLayout className={styles.for_you}>
        <div className={styles.for_you_tag}>
          <Icon icon="user-stroke-1" />
          <div></div>
        </div>
      </SectionLayout>
      <SectionLayout childrenClassName={styles.for_you_container}>
        {inforCardList?.map((card) => (
          <div key={card.title} className="pb-5">
            <InforCard
              imgUrl={card.images[0]}
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
      </SectionLayout>
      <SectionLayout childrenClassName="flex justify-center">
        <Button variant="outlined" text="Load more" width={400} />
      </SectionLayout>
      <div className={styles.introduction}>
        <SectionLayout transparent>
          <div className={styles.header}>
            A <span>Curated Platform & Experience</span>
            <p>For The Muslim Lifestyle</p>
          </div>
          {curatedList.map((item, index) => (
            <div key={index} className="flex gap-3 mt-5">
              <Icon icon="star-2" color="#e60112" />
              <div>
                <div className={styles.title}>{item.title}</div>
                <div className={styles.content}>{item.content}</div>
              </div>
            </div>
          ))}
        </SectionLayout>
      </div>
      <SectionLayout>
        <TopSearches />
      </SectionLayout>
    </div>
  )
}

export default Home
