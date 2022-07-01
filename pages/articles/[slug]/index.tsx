import ArticleCard from "components/ArticleCard/ArticleCard"
import Break from "components/Break/Break"
import Carousel from "components/Carousel/Carousel"
import Icon from "components/Icon/Icon"
import InforCard, { InforCardProps } from "components/InforCard/InforCard"
import SectionLayout from "components/SectionLayout/SectionLayout"
import TopSearches from "components/TopSearches/TopSearches"
import { homeArticleCarousel, homeCuratedResponsive, inforCardList } from "constant"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import styles from "styles/Articles.module.scss"

const breadcrumbs = [
  {text: "Home", path: "/home"},
  {text: "Eat listing", path: "/eat-listing"},
  {text: "Quick Bites", path: "/quick-bites"},
]

const dummyArticles = {
  title: "5 Halal Supermarket Snacks In Malaysia That Make Us Miss Thailand",
  date: "20/01/22",
  excerpt: `When you think of Thailand, its sandy beaches and beautiful islands often come to mind. But if you're a huge foodie like us, then it's quite likely that their delicious snacks are probably what you miss the most! Luckily for Malaysians, you can find plenty of halal Thai snacks in nearby supermarkets to keep your taste buds properly satisfied. Check them out below ?`,
  content: `
  <h3 class="mb-5 font-bold">2. MAMA instant noodles</h3>
  <div class="max-w-max mb-4">
    <img src="https://picsum.photos/728/778" alt="" class="rounded-2xl"/>
    <div class="flex items-center justify-end">
    <span clasname="">Credit:</span>
    <strong>candie_angie</strong>
    </div>
  </div>
  <p class="mb-4 max-w-[778px]">This one s for all our fellow instant noodle lovers! Slurp on some yummy MAMA instant noodles whenever your midnight cravings kick in and upgrade it with additional ingredients like sausages, steaks, vegetables and eggs.</p>
  <p class="mb-4  max-w-[778px]">P.S. Can t get enough? Here are <strong class="text-rose-600 underline underline-offset-3">18 halal Korean instant noodles you can get in Malaysia!</strong></p>
  <p class="mb-4  max-w-[778px]">This one's for all our fellow instant noodle lovers! Slurp on some yummy MAMA instant noodles whenever your midnight cravings kick in and upgrade it with additional ingredients like sausages, steaks, vegetables and eggs.</p>
  <img src="https://picsum.photos/728/437" alt="" class="rounded-2xl"/>
  <h3 class="my-5 font-bold">3. Koh Kae peanuts</h3>
  <div class="max-w-max mb-4">
    <img src="https://picsum.photos/728/778" alt="" class="rounded-2xl"/>
    <div class="flex items-center justify-end">
    <span clasname="">Credit:</span>
    <strong>candie_angie</strong>
    </div>
  </div>
  <p class="mb-4 max-w-[778px]">This one's for all our fellow instant noodle lovers! Slurp on some yummy MAMA instant noodles whenever your midnight cravings kick in and upgrade it with additional ingredients like sausages, steaks, vegetables and eggs.</p>
  <p class="mb-4  max-w-[778px]">P.S. Can t get enough? Here are <strong class="text-rose-600 underline underline-offset-3">18 halal Korean instant noodles you can get in Malaysia!</strong></p>
  <p class="font-bold mb-4">Want more articles like this? Check these out:</p>
  <p class="text-rose-600 font-bold mb-4">7 Yummy Halal Korean Food & Snacks You Can Get From Emart24</p>
  <p class="text-rose-600 font-bold mb-4">7 Yummy Halal Korean Food & Snacks You Can Get From Emart24</p>
  <p class="text-rose-600 font-bold mb-4">Get Halal French Pastries Delivered To Your Doorstep From These Halal Places In KL & Selangor</p>
  `
}

const infoCardResponsive = {
  xsShow: 2,
  xsScroll: 1,
  smShow: 2,
  smScroll: 2,
  mdShow: 2.5,
  mdScroll: 3,
  xlShow: 3.2,
  xlScroll: 3,
  show: 4,
  scroll: 3,
}

interface IArticle {
  title: string
  excerpt?: string
  date: string
  content: string
  brandRelated?: any[]
}

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
  const [article, setArticle] = useState<IArticle>({} as IArticle)

  useEffect(() => {
    setArticle(dummyArticles)
  }, [article])

  return (
    <div className={styles.articles}>
      <div className={styles.cover}>
        <div className={styles.cover_container}>
          <Image src="https://picsum.photos/1440/360"  alt="" layout="fill" className={styles.cover_image}/>
          <SectionLayout backgroundColor className={styles.cover_heading} containerClassName={styles.section_layout_container}>
            <div className={styles.articles_container}>
              <Breadcrumbs breadcrumbs={breadcrumbs}/>
              <h1 className={styles.title}>{article.title}</h1>
              <div className={styles.date}>{article.date}</div>
            </div>
          </SectionLayout>
        </div>
      </div>

      <div className={styles.content}>
        <SectionLayout containerClassName={styles.section_layout_container}>
          <div className={styles.call_to_action_fixed}>
            <ul className={styles.cta_list}>
              <li className={styles.cta_item}><Icon icon="facebook-logo" size={20}/></li>
              <li className={styles.cta_item}><Icon icon="instagram" size={16}/></li>
              <li className={styles.cta_item}><Icon icon="twitter-logo" color="#7F859F" size={20}/></li>
              <li className={styles.cta_item}><Icon icon="mail" color="#7F859F" size={17}/></li>
              <li className={styles.cta_item}><Icon icon="copy" color="#7F859F" size={22}/></li>
            </ul>
          </div>
          <div className={styles.articles_container}>
            <div className="advertisement max-w-[728px] mx-auto my-5">
              <Image src="https://picsum.photos/728/90"  width={728} height={90} layout="responsive" alt=""/>
            </div>
            <div className={styles.excerpt}>{article.excerpt}</div>
            <h3 className="mb-[32px] font-bold text-2xl">Best Halal Thai Snacks In Malaysia</h3>
            <h5 className="mb-[24px] font-bold text-base">Brands you can find:</h5>
            <div className="my-7">
              <Carousel responsive={infoCardResponsive}>
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
                    className="max-w-[95%] w-full"
                    isFavourited={true}
                  />
                ))}
              </Carousel>
            </div>
            <div dangerouslySetInnerHTML={{__html: article.content}}></div>

            <div className={styles.call_to_action_container}>
              <Break/>
              <div className={styles.call_to_action}>
                <span className="text-[11px]">SHARE</span>
                <ul className="flex items-center gap-[35px]">
                  <li><Icon icon="facebook-logo" size={20}/></li>
                  <li><Icon icon="instagram" size={16}/></li>
                  <li><Icon icon="twitter-logo" color="#7F859F" size={20}/></li>
                  <li><Icon icon="mail" color="#7F859F" size={17}/></li>
                  <li><Icon icon="copy" color="#7F859F" size={22}/></li>
                </ul>
              </div>
              <Break/>
            </div>

            <div className="advertisement max-w-[728px] mx-auto my-5">
              <Image src="https://picsum.photos/728/90"  width={728} height={90} layout="responsive" alt=""/>
            </div>
            <Break/>
          </div>
        </SectionLayout>

        <SectionLayout title="Featured Articles" className="pt-0" containerClassName={styles.section_layout_container}>
          <Carousel responsive={homeCuratedResponsive}>
            {homeArticleCarousel?.map((item, index) => (
              <div key={index} className="pb-5">
                <ArticleCard title={item.title} imgUrl={item.imgUrl} time={item.time} width="95%"/>
              </div>
            ))}
          </Carousel>
        </SectionLayout>

        <SectionLayout className="pt-0">
          <TopSearches/>
        </SectionLayout>
      </div>
    </div>
  )
}

export default ArticlesDetailPage