import Button from "components/Button/Button"
import Carousel from "components/Carousel/Carousel"
import Filter from "components/Filter/Filter"
import Icon from "components/Icon/Icon"
import InforCard from "components/InforCard/InforCard"
import Pagination from "components/Pagination/Pagination"
import SectionLayout from "components/SectionLayout/SectionLayout"
import Select from "components/Select/Select"
import TabsHorizontal, { ITab } from "components/TabsHorizontal/TabsHorizontal"
import TopSearches from "components/TopSearches/TopSearches"
import { dummySubCategories, homeBannerResponsive, homeCarousel, inforCardList } from "constant"
import useTrans from "hooks/useTrans"
import type { NextPage } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"

import styles from "styles/Home.module.scss"

const SubCategoryPage = () => {
  const trans = useTrans()
  const router = useRouter()
  const { query } = router
  const { category, subCategory }: any = query
  const [subCategoryData, setSubCategoryData] = useState<any[]>([])
  const [currentSubCategory, setCurrentSubCategory] = useState(subCategory)
  const [showFilter, setShowFilter] = useState(false)
  const [page, setPage] = useState<number | undefined>(1)
  useEffect(() => {
    //get subCategory data
    setSubCategoryData(inforCardList)
  }, [currentSubCategory, page])

  const handleChangeSubCategory = (e) => {
    setCurrentSubCategory(e)
    router.push(
      {
        pathname: `/${category}/${e}`,
      },
      undefined,
      { shallow: true }
    )
  }

  const formatDummySubCategories = [
    { label: "All", value: "all", slug: "all", icon: "https://picsum.photos/200/300" },
    ...dummySubCategories,
  ]

  return (
    <div>
      <SectionLayout className="pt-0">
        <div className={styles.breadcrumbs}>
          Home <Icon icon="carret-right" size={14} color="#7F859F" />
          {category}
          <Icon icon="carret-right" size={14} color="#7F859F" />
          {subCategory}
        </div>
        <Carousel responsive={homeBannerResponsive}>
          {homeCarousel?.map((img, index) => (
            <div key={index} className={styles.banner_card}>
              <Image alt="" layout="fill" src={img.imgUrl} />
            </div>
          ))}
        </Carousel>
      </SectionLayout>
      <SectionLayout className={styles.tab_filter}>
        <div className={styles.tab_filter_container}>
          <div className="flex">
            <TabsHorizontal
              tablist={formatDummySubCategories.slice(0, 5)}
              type="secondary-no-outline"
              selectedTab={currentSubCategory}
              className="pt-[6px]"
              onCurrentTab={handleChangeSubCategory}
            />
            <Select
              placeholder="More"
              isSearchable={false}
              width={50}
              className={styles.sub_category_more}
              variant="no-outlined"
              size="small"
              options={formatDummySubCategories.slice(5)}
              controlStyle={{ fontWeight: "bold", fontSize: "16px" }}
              placeholderStyle={{ fontWeight: "bold", fontSize: "16px", color: "#a4a8b7" }}
              onChange={(e) => handleChangeSubCategory(e.value)}
            />
          </div>
          <Button
            width={180}
            size="small"
            text="Filter & Sort"
            variant="secondary"
            prefix={<Icon icon="filter-1" />}
            onClick={() => setShowFilter(true)}
          />
        </div>
      </SectionLayout>
      <SectionLayout>
        <div className="flex flex-wrap gap-10">
          {Array.isArray(subCategoryData) &&
            subCategoryData.map((item) => (
              <div key={item.title} className="pb-5">
                <InforCard
                  imgUrl={item.images[0]}
                  title={item.title}
                  rate={item.rate}
                  rateNumber={item.rateNumber}
                  followerNumber={item.followerNumber}
                  price={item.price}
                  categories={item.categories}
                  tags={item.tags}
                  isVerified={item.isVerified}
                />
              </div>
            ))}
        </div>
        <Pagination onPageChange={(page) => setPage(page?.selected)} />
        <TopSearches />
      </SectionLayout>
      <Filter onClose={() => setShowFilter(false)} visible={showFilter} />
    </div>
  )
}

export default SubCategoryPage
