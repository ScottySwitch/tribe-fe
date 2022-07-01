import Breadcrumbs, { BreadcrumbsProps } from "components/Breadcrumbs/Breadcrumbs"
import Break from "components/Break/Break"
import Button from "components/Button/Button"
import Heading from "components/Heading/Heading"
import Icon from "components/Icon/Icon"
import SectionLayout from "components/SectionLayout/SectionLayout"
import TabsHorizontal, { ITab } from "components/TabsHorizontal/TabsHorizontal"
import TopSearches from "components/TopSearches/TopSearches"
import { useEffect, useState } from "react"
import styles from "styles/PageTemplate.module.scss"

const dummyBreadcrumbs: BreadcrumbsProps[] = [
  {text: "Home", path: "/home"},
  {text: "User", path: "/user"},
  {text: "Support", path: "/support"},
]

const dummyScrollspy = [
  "Who is it for?",
  "What is Tribes about?",
  "How old is Tribes?",
  "Is it available on my device?",
  "Who are the people behind Tribes?",
]

const dummyQuestion = [
  {question: "Who is it for?", answer: "HHWT Tribes aims to be a safe space for Muslims to discover travel-related content and share their own meaningful experiences. In addition to that, Muslims are able to discover great listings of where to eat, where to stay, what to see and what to buy. (BESTS)"},
  {question: "What is Tribes about?", answer: "HHWT Tribes aims to be a safe space for Muslims to discover travel-related content and share their own meaningful experiences. In addition to that, Muslims are able to discover great listings of where to eat, where to stay, what to see and what to buy. (BESTS)"},
  {question: "How old is Tribes?", answer: "HHWT Tribes aims to be a safe space for Muslims to discover travel-related content and share their own meaningful experiences. In addition to that, Muslims are able to discover great listings of where to eat, where to stay, what to see and what to buy. (BESTS)"},
  {question: "Is it available on my device?", answer: "HHWT Tribes aims to be a safe space for Muslims to discover travel-related content and share their own meaningful experiences. In addition to that, Muslims are able to discover great listings of where to eat, where to stay, what to see and what to buy. (BESTS)"},
  {question: "Who are the people behind Tribes?", answer: "HHWT Tribes aims to be a safe space for Muslims to discover travel-related content and share their own meaningful experiences. In addition to that, Muslims are able to discover great listings of where to eat, where to stay, what to see and what to buy. (BESTS)"},
  {question: "Who is it for?", answer: "HHWT Tribes aims to be a safe space for Muslims to discover travel-related content and share their own meaningful experiences. In addition to that, Muslims are able to discover great listings of where to eat, where to stay, what to see and what to buy. (BESTS)"},  
]

const QuestionItem = (props: {question: string, answer: string}) => {
  const {question, answer} = props
  return (
    <div className={styles.question_item}>
      <h5 className={styles.question}>{question}</h5>
      <p className={styles.answer}>{answer}</p>
    </div>
  )
}

const SupportPage = () => {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbsProps[]>([] as BreadcrumbsProps[])
  const [currentTab, setCurrentTab] = useState<string>()
  const [scrollspy, setScrollspy] = useState<any>(dummyScrollspy[0])
  const [questions, setQuestions] = useState<any>()

  const TabList: ITab[] = [
    { label: "For user", value: "for-user", content: "" },
    { label: "For business", value: "for-business", content: "" },
  ]

  useEffect(() => {
    setBreadcrumbs(dummyBreadcrumbs)
    setCurrentTab(TabList[0]?.value)
    setQuestions(dummyQuestion)
  }, [])

  return (
    <div className={styles.support}>
      <SectionLayout>
        <Breadcrumbs data={breadcrumbs} />
        <div className={styles.tab_support}>
          <TabsHorizontal
            tablist={TabList}
            type="secondary-no-outline"
            className="mb-0"
            onCurrentTab={(e) => setCurrentTab(e)}
          />
        </div>
        <div className="flex justify-between mt-[34px]">
          <div className={styles.left_col}>
            <div className={`${styles.left_col_bottom} mt-0`}>
              <Button text="Contact admin" width="max-content" prefix={<Icon icon="chat" color="#ffffff"/>}/>
              {dummyScrollspy?.map((item, index) => (
                <div
                  className="flex gap-3 justify-between"
                  key={item}
                >
                  <Heading
                    icon={item}
                    type="tab"
                    text={item}
                    selected={scrollspy === item}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className={styles.right_col}>
            {currentTab === "for-user" && (
              <div className="for-user">
                <ul>
                  {questions?.map((item, index) => (
                    <li key={index}>
                      <QuestionItem question={item.question} answer={item.answer}/>
                      {(index < questions.length - 1) && <Break/>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {currentTab === "for-business" && (
              <div className="for-business">
                <ul>
                  {questions?.map((item, index) => (
                    <li key={index}>
                      <QuestionItem question={item.question} answer={item.answer}/>
                      {(index < questions.length - 1) && <Break/>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <TopSearches className="mt-[80px]"/>
      </SectionLayout>
    </div>
  )
}

export default SupportPage