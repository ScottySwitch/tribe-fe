import Carousel from "components/Carousel/Carousel"
import Icon from "components/Icon/Icon"
import InforCard, { InforCardProps } from "components/InforCard/InforCard"
import SectionLayout from "components/SectionLayout/SectionLayout"
import { inforCardList } from "constant"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import styles from "styles/Articles.module.scss"

const breadcrumbs = [
  {text: "Home", path: "/home"},
  {text: "Eat listing", path: "/eat-listing"},
  {text: "Quick Bites", path: "/quick-bites"},
]

const Breadcrumbs = (props: {breadcrumbs: {text: string, path: string}[]}) => {
  const { breadcrumbs } = props

  return (
    <React.Fragment>
      <nav aria-label="breadcrumb">
        <ol className={styles.breadcrumbs}>
          {breadcrumbs?.map((crumb, index) => {
            if (index === breadcrumbs.length - 1) {
              return (<li key={index} className={styles.breadcrumb_item} aria-current="page">{crumb.text}</li>)
            }
            return (
              <li key={index} className={styles.breadcrumb_item}>
                <Link href={crumb.path}>{crumb.text}</Link>
                <Icon icon="carret-right" color="#E2E4E9"/>
              </li>
            )
            })}
        </ol>
      </nav>
    </React.Fragment>
  )
}

const ArticlesDetailPage = () => {
  return (
    <div className={styles.articles}>
      <div className={styles.cover}>
        <div className={styles.cover_container}>
          <Image src="https://picsum.photos/1440/360" height="100%" width="100%" alt="" layout="responsive" className={styles.cover_image}/>
          <SectionLayout backgroundColor className={styles.cover_heading}>
            <Breadcrumbs breadcrumbs={breadcrumbs}/>
            <h1 className={styles.title}>5 Halal Supermarket Snacks In Malaysia That Make Us Miss Thailand</h1>
            <div className={styles.date}>20/01/22</div>
          </SectionLayout>
        </div>
      </div>

      <div className="content">
        <SectionLayout>
          <p>When you think of Thailand, its sandy beaches and beautiful islands often come to mind. But if you're a huge foodie like us, then it's quite likely that their delicious snacks are probably what you miss the most! Luckily for Malaysians, you can find plenty of halal Thai snacks in nearby supermarkets to keep your taste buds properly satisfied. Check them out below ?</p>

          <h3>Best Halal Thai Snacks In Malaysia</h3>
          <div>Brands you can find:</div>
          <Carousel>
            {inforCardList?.map((card: InforCardProps, index) => (
              <InforCard
                key={index}
                imgUrl={card.imgUrl}
                title={card.title}
                rate={card.rate}
                rateNumber={card.rateNumber}
                followerNumber={card.followerNumber}
                price={card.price}
                categories={card.categories}
                tags={card.tags}
                iconTag={true}
                isVerified={card.isVerified}
                className="w-full"
                isFavourited={true}
              />
            ))}
          </Carousel>
        </SectionLayout>
      </div>
    </div>
  )
}

export default ArticlesDetailPage