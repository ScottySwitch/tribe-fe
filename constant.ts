import { Categories, InformationList, ListingTabs } from "enums";

export const eatTabList = [
  { text: "Dishes", value: ListingTabs.DISH },
  { text: "Menus", value: ListingTabs.MENU },
  { text: "Deals", value: ListingTabs.DEAL },
];

export const informationList = [
  { label: InformationList.BUSINESS_INFORMATION, icon: "user-color-2" },
  { label: InformationList.BUSINESS_DETAIL, icon: "business" },
  { label: InformationList.PHOTOS_VIDEOS, icon: "play" },
  { label: InformationList.PRODUCT_LISTING, icon: "buy-color", paid: true },
  { label: InformationList.MANAGE_DEALS, icon: "deal", paid: true },
  { label: InformationList.ANALYTICS, icon: "chart", paid: true },
  { label: InformationList.CHANGE_ACCOUNT_TIER, icon: "reward-color" },
  { label: InformationList.VERIFICATION, icon: "like-color-2" },
  { label: InformationList.LOGOUT, icon: "log-out1" },
];

export const productTabList = [
  { text: "Products", value: ListingTabs.PRODUCT },
  { text: "Deals", value: ListingTabs.DEAL },
];

export const serviceTabList = [
  { text: "Services", value: ListingTabs.SERVICE },
  { text: "Deals", value: ListingTabs.DEAL },
];

export const inforCardList = [
  {
    imgUrl: "https://picsum.photos/200/300",
    title: "Evertop Hainanese Boneless Chicken",
    rate: 4.5,
    rateNumber: 25,
    followerNumber: 500,
    price: "$37.35",
    categories: ["Fast food", "Desserts"],
    tags: ["Hot deals", "Best sellers"],
    isVerified: true,
  },
  {
    imgUrl: "https://picsum.photos/200/300",
    title: "Evertop Hainanese Boneless Chicken",
    rate: 4.5,
    rateNumber: 25,
    followerNumber: 500,
    price: "$37.35",
    categories: ["Fast food", "Desserts"],
    tags: ["Hot deals", "Best sellers"],
    isVerified: false,
  },
  {
    imgUrl: "https://picsum.photos/200/300",
    title: "Evertop Hainanese Boneless Chicken",
    rate: 4.5,
    rateNumber: 25,
    followerNumber: 500,
    price: "$37.35",
    categories: ["Fast food", "Desserts"],
    tags: ["Hot deals", "Best sellers"],
    isVerified: true,
  },
  {
    imgUrl: "https://picsum.photos/200/300",
    title: "Evertop Hainanese Boneless Chicken",
    rate: 4.5,
    rateNumber: 25,
    followerNumber: 500,
    price: "$37.35",
    categories: ["Fast food", "Desserts"],
    tags: ["Hot deals", "Best sellers"],
  },
  {
    imgUrl: "https://picsum.photos/200/300",
    title: "Evertop Hainanese Boneless Chicken",
    rate: 4.5,
    rateNumber: 25,
    followerNumber: 500,
    price: "$37.35",
    categories: ["Fast food", "Desserts"],
    tags: ["Hot deals", "Best sellers"],
    isVerified: true,
  },
  {
    imgUrl: "https://picsum.photos/200/300",
    title: "Evertop Hainanese Boneless Chicken",
    rate: 4.5,
    rateNumber: 25,
    followerNumber: 500,
    price: "$37.35",
    categories: ["Fast food", "Desserts"],
    tags: ["Hot deals", "Best sellers"],
    isVerified: true,
  },
  {
    imgUrl: "https://picsum.photos/200/300",
    title: "Evertop Hainanese Boneless Chicken",
    rate: 4.5,
    rateNumber: 25,
    followerNumber: 500,
    price: "$37.35",
    categories: ["Fast food", "Desserts"],
    tags: ["Hot deals", "Best sellers"],
    isVerified: true,
  },
  {
    imgUrl: "https://picsum.photos/200/300",
    title: "Evertop Hainanese Boneless Chicken",
    rate: 4.5,
    rateNumber: 25,
    followerNumber: 500,
    price: "$37.35",
    categories: ["Fast food", "Desserts"],
    tags: ["Hot deals", "Best sellers"],
    isVerified: true,
  },
  {
    imgUrl: "https://picsum.photos/200/300",
    title: "Evertop Hainanese Boneless Chicken",
    rate: 4.5,
    rateNumber: 25,
    followerNumber: 500,
    price: "$37.35",
    categories: ["Fast food", "Desserts"],
    tags: ["Hot deals", "Best sellers"],
    isVerified: true,
  },
];

export const interestingList = [
  { avatar: "https://picsum.photos/200/300", label: "Animal" },
  { avatar: "https://picsum.photos/200/300", label: "Spicy" },
  { avatar: "https://picsum.photos/200/300", label: "DIY" },
  { avatar: "https://picsum.photos/200/300", label: "Festival" },
  { avatar: "https://picsum.photos/200/300", label: "Anime" },
  { avatar: "https://picsum.photos/200/300", label: "Hot food" },
  { avatar: "https://picsum.photos/200/300", label: "Travel" },
  { avatar: "https://picsum.photos/200/300", label: "Ice cream" },
  { avatar: "https://picsum.photos/200/300", label: "Shopping" },
];

export const contributePopOverList = [
  { icon: "map-color", label: "Add new listing", href: "/add-listing" },
  { icon: "comment-color", label: "Add new review", href: "/add-review" },
  { icon: "update-color", label: "Update listing", href: "/update-listing" },
];

export const locations = [
  { label: "Singapore", value: "singapore" },
  { label: "Malaysia", value: "malaysia" },
  { label: "Indonesia", value: "indonesia" },
  { label: "India", value: "india" },
  { label: "Thailand", value: "thailand" },
];

export const categories = [
  {
    width: "w-[30px]",
    icon: "buy-color",
    label: "Buy",
    value: Categories.BUY,
    options: [
      { label: "Restaurant", value: "restaurant" },
      { label: "Coffee & Tea", value: "coffee-tea" },
      { label: "Bakeries", value: "bakeries" },
      { label: "Dessert", value: "dessert" },
      { label: "Quick bites", value: "quick-bites" },
    ],
  },
  {
    width: "w-[30px]",
    icon: "eat-color",
    label: "Eat",
    value: Categories.EAT,
    options: [
      { label: "Quick bites", value: "quick-bites" },
      { label: "Restaurant", value: "restaurant" },
      { label: "Dessert", value: "dessert" },
      { label: "Coffee & Tea", value: "coffee-tea" },
      { label: "Bakeries", value: "bakeries" },
    ],
  },
  {
    width: "w-[70px]",
    icon: "camera-color",
    label: "See & Do",
    value: Categories.SEE_AND_DO,
    options: [
      { label: "Coffee & Tea", value: "coffee-tea" },
      { label: "Restaurant", value: "restaurant" },
      { label: "Bakeries", value: "bakeries" },
      { label: "Quick bites", value: "quick-bites" },
      { label: "Dessert", value: "dessert" },
    ],
  },
  {
    width: "w-[80px]",
    icon: "car-color",
    label: "Transport",
    value: Categories.TRANSPORT,
    options: [
      { label: "Dessert", value: "dessert" },
      { label: "Bakeries", value: "bakeries" },
      { label: "Quick bites", value: "quick-bites" },
      { label: "Coffee & Tea", value: "coffee-tea" },
      { label: "Restaurant", value: "restaurant" },
    ],
  },
  {
    width: "w-[30px]",
    icon: "bed-color",
    label: "Stay",
    value: Categories.STAY,
    options: [
      { label: "Restaurant", value: "restaurant" },
      { label: "Quick bites", value: "quick-bites" },
      { label: "Bakeries", value: "bakeries" },
      { label: "Coffee & Tea", value: "coffee-tea" },
      { label: "Dessert", value: "dessert" },
    ],
  },
];

export const listingSearchResult = [
  {
    id: "a1762871287348",
    label: "Minatoso",
    name: "Minatoso",
    value: "minatoso",
    location: "Kyoto, Japan",
    icon: "eat-color",
    avatar: "https://picsum.photos/200/300",
    reviewNumber: 12,
    imageNumber: 10,
    followers: 500,
  },
  {
    id: "a8798278394",
    label: "Mina mark",
    name: "Mina mark",
    value: "mina-mark",
    location: "Mexico",
    icon: "buy-color",
    avatar: "https://picsum.photos/200/300",
    reviewNumber: 12,
    imageNumber: 10,
    followers: 500,
  },
  {
    id: "ab78472bdh394",
    label: "Mina Braise",
    name: "Mina Braise",
    value: "mina-braise",
    location: "Dubai",
    icon: "camera-color",
    avatar: "https://picsum.photos/200/300",
    reviewNumber: 12,
    imageNumber: 10,
    followers: 500,
  },
  {
    id: "v9vfv88472bdh",
    label: "MinaBurihako",
    name: "MinaBurihako",
    value: "minaburihako",
    location: "Lohore, Pakistan",
    icon: "car-color",
    avatar: "https://picsum.photos/200/300",
    reviewNumber: 12,
    imageNumber: 10,
    followers: 500,
  },
];

export const roleList = [
  { label: "Owner", value: "owner" },
  { label: "Manager", value: "manager" },
  { label: "Agency/ Consultant", value: "consultant" },
  { label: "Accounting/ Finance", value: "finance" },
  { label: "Guest service/ Front Office", value: "front-office" },
  { label: "Marketing", value: "marketing" },
];
