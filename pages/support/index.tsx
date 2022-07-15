import Breadcrumbs, {
  BreadcrumbsProps,
} from "components/Breadcrumbs/Breadcrumbs";
import Break from "components/Break/Break";
import Button from "components/Button/Button";
import Heading from "components/Heading/Heading";
import Icon from "components/Icon/Icon";
import SectionLayout from "components/SectionLayout/SectionLayout";
import TabsHorizontal, { ITab } from "components/TabsHorizontal/TabsHorizontal";
import TopSearches from "components/TopSearches/TopSearches";
import { useEffect, useState } from "react";
import styles from "styles/PageTemplate.module.scss";

const dummyBreadcrumbs: BreadcrumbsProps[] = [
  { text: "Home", path: "/home" },
  { text: "User", path: "/user" },
  { text: "Support", path: "/support" },
];

const dummyScrollspy = [
  "Who is it for?",
  "What is Tribes about?",
  "How old is Tribes?",
  "Is it available on my device?",
  "Who are the people behind Tribes?",
];

const dummyQuestion = [
  {
    question: "What is Tribes?",
    answer:
      "Tribes is a community-driven, lifestyle platform for Muslims to explore and discover new content in the areas of *Buy, Eat, Stay, Transport, See & Do.* All items listed on the platform are Muslim-friendly. As much as we have a team of dedicated members working tirelessly curating listings to help fellow community members make better travel and purchase decisions, we believe fully that each community member has the power and desire to contribute and share as well. This platform is designed in a way that allows each and every one of you to create and edit unclaimed listings, as well as to leave honest reviews and feedback on every brand listed on the platform. Our cumulative effort will enable the Tribes community and platform to become better!",
  },
  {
    question: "Who is it for?",
    answer:
      "Tribes is for everyone and anyone, regardless of race, language or religion, who is interested to contribute and be a part of the Muslim community.",
  },
  {
    question: "How can I contribute to the Tribes community?",
    answer:
      "There are currently 3 ways for you to contribute to the community! Every contribution will enable you to earn Tribes points." + 
      "Edit a listing - if you see a familiar brand with incomplete or outdated information, you will be able to suggest an edit to put in the correct information." + 
      "Suggest a new listing - know of a new brand that is currently not listed on Tribes? Feel free to create a page for them so that other users will learn of the new options that they have"+
      "Reviews - Purchased or dined in at one of the brands listed on Tribes? Share your experience with other Tribes users! This will help them make better decisions based on their requirements."
  },
  {
    question: "How old is Tribes?",
    answer:
      "HHWT Tribes aims to be a safe space for Muslims to discover travel-related content and share their own meaningful experiences. In addition to that, Muslims are able to discover great listings of where to eat, where to stay, what to see and what to buy. (BESTS)",
  },
  {
    question: "Is it available on my device?",
    answer:
      "HHWT Tribes aims to be a safe space for Muslims to discover travel-related content and share their own meaningful experiences. In addition to that, Muslims are able to discover great listings of where to eat, where to stay, what to see and what to buy. (BESTS)",
  },
  {
    question: "Who are the people behind Tribes?",
    answer:
      "HHWT Tribes aims to be a safe space for Muslims to discover travel-related content and share their own meaningful experiences. In addition to that, Muslims are able to discover great listings of where to eat, where to stay, what to see and what to buy. (BESTS)",
  },
  {
    question: "Who is it for?",
    answer:
      "HHWT Tribes aims to be a safe space for Muslims to discover travel-related content and share their own meaningful experiences. In addition to that, Muslims are able to discover great listings of where to eat, where to stay, what to see and what to buy. (BESTS)",
  },
];

const QuestionItem = (props: { question: string; answer: string }) => {
  const { question, answer } = props;
  return (
    <div className={styles.question_item}>
      <h5 className={styles.question}>{question}</h5>
      <p className={styles.answer}>{answer}</p>
    </div>
  );
};

const SupportPage = () => {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbsProps[]>(
    [] as BreadcrumbsProps[]
  );
  const [currentTab, setCurrentTab] = useState<string | number>();
  const [scrollspy, setScrollspy] = useState<any>(dummyScrollspy[0]);
  const [questions, setQuestions] = useState<any>();

  const TabList: ITab[] = [
    { label: "For user", value: "for-user", content: "" },
    { label: "For business", value: "for-business", content: "" },
  ];

  useEffect(() => {
    setBreadcrumbs(dummyBreadcrumbs);
    setCurrentTab(TabList[0]?.value);
    setQuestions(dummyQuestion);
  }, [currentTab]);

  return (
    <div className={styles.support}>
      <SectionLayout>
        <Breadcrumbs data={breadcrumbs} />
        <h1 className={styles.title}>Support</h1>
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
              <Button
                text="Contact admin"
                width="max-content"
                prefix={<Icon icon="chat" color="#ffffff" />}
              />
              {dummyScrollspy?.map((item, index) => (
                <div className="flex gap-3 justify-between" key={item}>
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
                      <QuestionItem
                        question={item.question}
                        answer={item.answer}
                      />
                      {index < questions.length - 1 && <Break />}
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
                      <QuestionItem
                        question={item.question}
                        answer={item.answer}
                      />
                      {index < questions.length - 1 && <Break />}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <TopSearches className="mt-[80px]" />
      </SectionLayout>
    </div>
  );
};

export default SupportPage;
