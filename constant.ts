import { Categories, InformationList, ListingTabs } from "enums"
import { IAddListingForm } from "pages/add-listing"

export const loginInforItem = "login_infor"

export const fakeSubCateList = [
  { label: "Subcate", value: "Subcate" },
  { label: "Subcate 1", value: "Subcate 1" },
  { label: "Subcate 2", value: "Subcate 2" },
  { label: "Subcate 3", value: "Subcate 3" },
  { label: "Subcate 4", value: "Subcate 4" },
]

export const bizInformationDefaultFormData = {
  name: "Evertop Hainanese Boneless Chicken",
  description:
    "The first restaurant proprietor is believed to have been one A. Boulanger, a soup vendor, who opened his business in Paris in 1765. The sign above his door advertised restoratives, or restaurants, referring to the soups and broths available within.",
  address: "50 Bussorah St, Singapore 199466",
  phone: "+84 823996913",
  productList: [
    {
      imgUrl: "https://picsum.photos/200/300",
      name: "Evertop Hainanese Boneless Chicken...",
      description: "A product description is a form of marketing copy used...",
      price: "$ 37.35",
    },
    {
      imgUrl: "https://picsum.photos/200/300",
      name: "Evertop Hainanese Boneless Chicken...",
      description: "A product description is a form of marketing copy used...",
      price: "$ 37.35",
    },
    {
      imgUrl: "https://picsum.photos/200/300",
      name: "Evertop Hainanese Boneless Chicken...",
      description: "A product description is a form of marketing copy used...",
      price: "$ 37.35",
    },
    {
      imgUrl: "https://picsum.photos/200/300",
      name: "Evertop Hainanese Boneless Chicken...",
      description: "A product description is a form of marketing copy used...",
      price: "$ 37.35",
    },
  ],
  activeDeals: [
    {
      name: "Deal name",
      description: "10% off Set Meals only",
      date: "April 17, 2022 - April 17, 2022",
      clicks: "123",
    },
    {
      name: "Deal name",
      description: "10% off Set Meals only",
      date: "April 17, 2022 - April 17, 2022",
      clicks: "123",
    },
    {
      name: "Deal name",
      description: "10% off Set Meals only",
      date: "April 17, 2022 - April 17, 2022",
      clicks: "123",
    },
  ],
}

export const fakeAddlistingForm: IAddListingForm = {
  category: "Restaurant",
  relationship: "",
  listing: "",
  role: "",
  isOpen: "",
  openDate: "",
  businessName: "",
  description: "",
  isOnline: "",
  city: "",
  country: "",
  address: "",
  additionalAddress: "",
  contact: "",
  email: "",
  socialMedia: "",
  currency: "$",
  minPrice: "10",
  maxPrice: "100",
  categoryKind: "Restaurant",
  agreePolicies: "",
  images: [],
  openHours: [
    { name: "Monday", twentyFourHours: false, openHours: [] },
    { name: "Tuesday", twentyFourHours: false, openHours: [] },
    {
      name: "Wednesday",
      twentyFourHours: false,
      openHours: [],
    },
    {
      name: "Thursday",
      twentyFourHours: false,
      openHours: [],
    },
    { name: "Friday", twentyFourHours: false, openHours: [] },
    {
      name: "Saturday",
      twentyFourHours: false,
      openHours: [],
    },
    { name: "Sunday", twentyFourHours: false, openHours: [] },
  ],

  tags: ["Italian", "Chinese"],
  mealsKind: ["Breakfast", "Drinks"],
  placeGoodFor: ["Kids", "Bar Scence"],
  parking: ["Street parking"],
  atmosphere: ["Beach", "Al Fresco"],
  payment: ["Cash only"],
  additionalServices: ["Takeouts", "Prayer facility available/nearby"],
  foodOptions: [""],
  paryerFacilities: [""],
  foodOptionsRamadan: [""],
  nonHalalActivities: [""],
}

export const defaultAddlistingForm: IAddListingForm = {
  category: "",
  relationship: "",
  listing: "",
  role: "",
  isOpen: "",
  openDate: "",
  businessName: "",
  description: "",
  isOnline: "",
  city: "",
  country: "",
  address: "",
  additionalAddress: "",
  contact: "",
  email: "",
  socialMedia: "",
  currency: "",
  minPrice: "",
  maxPrice: "",
  categoryKind: "",
  agreePolicies: "",
  images: [],
  openHours: [
    { name: "Monday", twentyFourHours: false, openHours: [] },
    { name: "Tuesday", twentyFourHours: false, openHours: [] },
    {
      name: "Wednesday",
      twentyFourHours: false,
      openHours: [],
    },
    {
      name: "Thursday",
      twentyFourHours: false,
      openHours: [],
    },
    { name: "Friday", twentyFourHours: false, openHours: [] },
    {
      name: "Saturday",
      twentyFourHours: false,
      openHours: [],
    },
    { name: "Sunday", twentyFourHours: false, openHours: [] },
  ],

  tags: [],
  mealsKind: [""],
  placeGoodFor: [""],
  parking: [""],
  atmosphere: [""],
  payment: [""],
  additionalServices: [""],
  foodOptions: [""],
  paryerFacilities: [""],
  foodOptionsRamadan: [""],
  nonHalalActivities: [""],
}

export const previewInfo = [
  { question: "What kind of place is this?", valueKey: "category" },
  {
    question:
      "Are you affiliated with this place as an owner, employee, or official representative?",
    valueKey: "relationship",
  },
  {
    question: "Does this place already have a listing on Tribes?",
    valueKey: "listing",
  },
  { question: "What is your role at this business?", valueKey: "role.label" },
  { question: "Is this place currently open?", valueKey: "isOpen" },
  { question: "Official place name", valueKey: "businessName" },
  { question: "Description of your property:", valueKey: "description" },
  { question: "City/Town, State/Province/Region", valueKey: "city" },
  { question: "Country", valueKey: "country" },
  { question: "Street address ", valueKey: "address" },
  { question: "Additional address information", valueKey: "additionalAddress" },
  { question: "Social Media", valueKey: "socialMedia" },
  { question: "What is the category that best fits this place?", valueKey: "categoryKind" },
  { question: "What type of cuisine does this place serve?", valueKey: "tags" },
  { question: "Open hours", valueKey: "openHours" },
  { question: "Select a currency", valueKey: "currency" },
  { question: "Max price", valueKey: "maxPrice" },
  { question: "Min price", valueKey: "minPrice" },
]

export const eatTabList = [
  { text: "Dishes", value: ListingTabs.DISH },
  { text: "Menus", value: ListingTabs.MENU },
  { text: "Deals", value: ListingTabs.DEAL },
]

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
]

export const productTabList = [
  { text: "Products", value: ListingTabs.PRODUCT },
  { text: "Deals", value: ListingTabs.DEAL },
]

export const serviceTabList = [
  { text: "Services", value: ListingTabs.SERVICE },
  { text: "Deals", value: ListingTabs.DEAL },
]

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
]

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
]

export const contributePopOverList = [
  { icon: "map-color", label: "Add new listing", href: "/add-listing" },
  { icon: "comment-color", label: "Add new review", href: "/add-review" },
  { icon: "update-color", label: "Update listing", href: "/update-listing" },
]

export const switchAccountList = [
  { name: "Evertop Hainanese Boneless Chicken" },
  { name: "The Cheese Merchant 1" },
  { name: "The Cheese Merchant 2" },
  { name: "The Cheese Merchant 3" },
]

export const locations = [
  { label: "Singapore", value: "singapore" },
  { label: "Malaysia", value: "malaysia" },
  { label: "Indonesia", value: "indonesia" },
  { label: "India", value: "india" },
  { label: "Thailand", value: "thailand" },
]

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
]

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
]

export const roleList = [
  { label: "Owner", value: "owner" },
  { label: "Manager", value: "manager" },
  { label: "Agency/ Consultant", value: "consultant" },
  { label: "Accounting/ Finance", value: "finance" },
  { label: "Guest service/ Front Office", value: "front-office" },
  { label: "Marketing", value: "marketing" },
]

export const educationLevels = [
  { label: "High School", value: "High School" },
  { label: "Non-Tertiary", value: "Non-Tertiary" },
  { label: "Polytechnic", value: "Polytechnic" },
  { label: "Bachelor's", value: "Bachelor's" },
  { label: "Master's", value: "Master's" },
  { label: "Doctorate", value: "Doctorate" },
]

export const industryList = [
  { label: "Accountancy", value: "Accountancy" },
  { label: "Advertising", value: "Advertising" },
  { label: "Agriculture & Chemical Industry", value: "Agriculture & Chemical Industry" },
  { label: "Commerce", value: "Commerce" },
  { label: "Construction", value: "Construction" },
  { label: "Design", value: "Design" },
  { label: "Edutcation", value: "Edutcation" },
  { label: "Entertainment", value: "Entertainment" },
  { label: "Financial", value: "Financial" },
  { label: "Services", value: "Services" },
  { label: "Food & Beverage Services", value: "Food & Beverage Services" },
  { label: "Health", value: "Health" },
  { label: "Information Technology", value: "Information Technology" },
  { label: "Marketing", value: "Marketing" },
  { label: "Mechanical and Electrical", value: "Mechanical and Electrical" },
  { label: "Engineering", value: "Engineering" },
  { label: "Media", value: "Media" },
  { label: "Public Services", value: "Public Services" },
  { label: "Real Estates", value: "Real Estates" },
  { label: "Social services", value: "Social services" },
  { label: "Shipping & Logistics", value: "Shipping & Logistics" },
  { label: "Tourism", value: "Tourism" },
  { label: "Transportation", value: "Transportation" },
]

export const countryList = [
  { label: "Afghanistan", value: "Afghanistan" },
  { label: "Albania", value: "Albania" },
  { label: "Algeria", value: "Algeria" },
  { label: "Andorra", value: "Andorra" },
  { label: "Angola", value: "Angola" },
  { label: "Antigua and Barbuda", value: "Antigua and Barbuda" },
  { label: "Argentina", value: "Argentina" },
  { label: "Armenia", value: "Armenia" },
  { label: "Australia", value: "Australia" },
  { label: "Austria", value: "Austria" },
  { label: "Azerbaijan", value: "Azerbaijan" },
  { label: "Bahamas", value: "Bahamas" },
  { label: "Bahrain", value: "Bahrain" },
  { label: "Bangladesh", value: "Bangladesh" },
  { label: "Barbados", value: "Barbados" },
  { label: "Belarus", value: "Belarus" },
  { label: "Belgium", value: "Belgium" },
  { label: "Belize", value: "Belize" },
  { label: "Benin", value: "Benin" },
  { label: "Bhutan", value: "Bhutan" },
  { label: "Bolivia", value: "Bolivia" },
  { label: "Bosnia and Herzegovina", value: "Bosnia and Herzegovina" },
  { label: "Botswana", value: "Botswana" },
  { label: "Brazil", value: "Brazil" },
  { label: "Brunei", value: "Brunei" },
  { label: "Bulgaria", value: "Bulgaria" },
  { label: "Burkina Faso", value: "Burkina Faso" },
  { label: "Burundi", value: "Burundi" },
  { label: "Côte d'Ivoire", value: "Côte d'Ivoire" },
  { label: "Cabo Verde", value: "Cabo Verde" },
  { label: "Cambodia", value: "Cambodia" },
  { label: "Cameroon", value: "Cameroon" },
  { label: "Canada", value: "Canada" },
  { label: "Central African Republic", value: "Central African Republic" },
  { label: "Chad", value: "Chad" },
  { label: "Chile", value: "Chile" },
  { label: "China", value: "China" },
  { label: "Colombia", value: "Colombia" },
  { label: "Comoros", value: "Comoros" },
  { label: "Congo (Congo-Brazzaville)", value: "Congo (Congo-Brazzaville)" },
  { label: "Costa Rica", value: "Costa Rica" },
  { label: "Croatia", value: "Croatia" },
  { label: "Cuba", value: "Cuba" },
  { label: "Cyprus", value: "Cyprus" },
  { label: "Czechia (Czech Republic)", value: "Czechia (Czech Republic)" },
  { label: "Democratic Republic of the Congo", value: "Democratic Republic of the Congo" },
  { label: "Denmark", value: "Denmark" },
  { label: "Djibouti", value: "Djibouti" },
  { label: "Dominica", value: "Dominica" },
  { label: "Dominican Republic", value: "Dominican Republic" },
  { label: "Ecuador", value: "Ecuador" },
  { label: "Egypt", value: "Egypt" },
  { label: "El Salvador", value: "El Salvador" },
  { label: "Equatorial Guinea", value: "Equatorial Guinea" },
  { label: "Eritrea", value: "Eritrea" },
  { label: "Estonia", value: "Estonia" },
  { label: "Eswatini (fmr. Swaziland)", value: "Eswatini (fmr. Swaziland)" },
  { label: "Ethiopia", value: "Ethiopia" },
  { label: "Fiji", value: "Fiji" },
  { label: "Finland", value: "Finland" },
  { label: "France", value: "France" },
  { label: "Gabon", value: "Gabon" },
  { label: "Gambia", value: "Gambia" },
  { label: "Georgia", value: "Georgia" },
  { label: "Germany", value: "Germany" },
  { label: "Ghana", value: "Ghana" },
  { label: "Greece", value: "Greece" },
  { label: "Grenada", value: "Grenada" },
  { label: "Guatemala", value: "Guatemala" },
  { label: "Guinea", value: "Guinea" },
  { label: "Guinea-Bissau", value: "Guinea-Bissau" },
  { label: "Guyana", value: "Guyana" },
  { label: "Haiti", value: "Haiti" },
  { label: "Holy See", value: "Holy See" },
  { label: "Honduras", value: "Honduras" },
  { label: "Hungary", value: "Hungary" },
  { label: "Iceland", value: "Iceland" },
  { label: "India", value: "India" },
  { label: "Indonesia", value: "Indonesia" },
  { label: "Iran", value: "Iran" },
  { label: "Iraq", value: "Iraq" },
  { label: "Ireland", value: "Ireland" },
  { label: "Israel", value: "Israel" },
  { label: "Italy", value: "Italy" },
  { label: "Jamaica", value: "Jamaica" },
  { label: "Japan", value: "Japan" },
  { label: "Jordan", value: "Jordan" },
  { label: "Kazakhstan", value: "Kazakhstan" },
  { label: "Kenya", value: "Kenya" },
  { label: "Kiribati", value: "Kiribati" },
  { label: "Kuwait", value: "Kuwait" },
  { label: "Kyrgyzstan", value: "Kyrgyzstan" },
  { label: "Laos", value: "Laos" },
  { label: "Latvia", value: "Latvia" },
  { label: "Lebanon", value: "Lebanon" },
  { label: "Lesotho", value: "Lesotho" },
  { label: "Liberia", value: "Liberia" },
  { label: "Libya", value: "Libya" },
  { label: "Liechtenstein", value: "Liechtenstein" },
  { label: "Lithuania", value: "Lithuania" },
  { label: "Luxembourg", value: "Luxembourg" },
  { label: "Madagascar", value: "Madagascar" },
  { label: "Malawi", value: "Malawi" },
  { label: "Malaysia", value: "Malaysia" },
  { label: "Maldives", value: "Maldives" },
  { label: "Mali", value: "Mali" },
  { label: "Malta", value: "Malta" },
  { label: "Marshall Islands", value: "Marshall Islands" },
  { label: "Mauritania", value: "Mauritania" },
  { label: "Mauritius", value: "Mauritius" },
  { label: "Mexico", value: "Mexico" },
  { label: "Micronesia", value: "Micronesia" },
  { label: "Moldova", value: "Moldova" },
  { label: "Monaco", value: "Monaco" },
  { label: "Mongolia", value: "Mongolia" },
  { label: "Montenegro", value: "Montenegro" },
  { label: "Morocco", value: "Morocco" },
  { label: "Mozambique", value: "Mozambique" },
  { label: "Myanmar (formerly Burma)", value: "Myanmar (formerly Burma)" },
  { label: "Namibia", value: "Namibia" },
  { label: "Nauru", value: "Nauru" },
  { label: "Nepal", value: "Nepal" },
  { label: "Netherlands", value: "Netherlands" },
  { label: "New Zealand", value: "New Zealand" },
  { label: "Nicaragua", value: "Nicaragua" },
  { label: "Niger", value: "Niger" },
  { label: "Nigeria", value: "Nigeria" },
  { label: "North Korea", value: "North Korea" },
  { label: "North Macedonia", value: "North Macedonia" },
  { label: "Norway", value: "Norway" },
  { label: "Oman", value: "Oman" },
  { label: "Pakistan", value: "Pakistan" },
  { label: "Palau", value: "Palau" },
  { label: "Palestine State", value: "Palestine State" },
  { label: "Panama", value: "Panama" },
  { label: "Papua New Guinea", value: "Papua New Guinea" },
  { label: "Paraguay", value: "Paraguay" },
  { label: "Peru", value: "Peru" },
  { label: "Philippines", value: "Philippines" },
  { label: "Poland", value: "Poland" },
  { label: "Portugal", value: "Portugal" },
  { label: "Qatar", value: "Qatar" },
  { label: "Romania", value: "Romania" },
  { label: "Russia", value: "Russia" },
  { label: "Rwanda", value: "Rwanda" },
  { label: "Saint Kitts and Nevis", value: "Saint Kitts and Nevis" },
  { label: "Saint Lucia", value: "Saint Lucia" },
  { label: "Saint Vincent and the Grenadines", value: "Saint Vincent and the Grenadines" },
  { label: "Samoa", value: "Samoa" },
  { label: "San Marino", value: "San Marino" },
  { label: "Sao Tome and Principe", value: "Sao Tome and Principe" },
  { label: "Saudi Arabia", value: "Saudi Arabia" },
  { label: "Senegal", value: "Senegal" },
  { label: "Serbia", value: "Serbia" },
  { label: "Seychelles", value: "Seychelles" },
  { label: "Sierra Leone", value: "Sierra Leone" },
  { label: "Singapore", value: "Singapore" },
  { label: "Slovakia", value: "Slovakia" },
  { label: "Slovenia", value: "Slovenia" },
  { label: "Solomon Islands", value: "Solomon Islands" },
  { label: "Somalia", value: "Somalia" },
  { label: "South Africa", value: "South Africa" },
  { label: "South Korea", value: "South Korea" },
  { label: "South Sudan", value: "South Sudan" },
  { label: "Spain", value: "Spain" },
  { label: "Sri Lanka", value: "Sri Lanka" },
  { label: "Sudan", value: "Sudan" },
  { label: "Suriname", value: "Suriname" },
  { label: "Sweden", value: "Sweden" },
  { label: "Switzerland", value: "Switzerland" },
  { label: "Syria", value: "Syria" },
  { label: "Tajikistan", value: "Tajikistan" },
  { label: "Tanzania", value: "Tanzania" },
  { label: "Thailand", value: "Thailand" },
  { label: "Timor-Leste", value: "Timor-Leste" },
  { label: "Togo", value: "Togo" },
  { label: "Tonga", value: "Tonga" },
  { label: "Trinidad and Tobago", value: "Trinidad and Tobago" },
  { label: "Tunisia", value: "Tunisia" },
  { label: "Turkey", value: "Turkey" },
  { label: "Turkmenistan", value: "Turkmenistan" },
  { label: "Tuvalu", value: "Tuvalu" },
  { label: "Uganda", value: "Uganda" },
  { label: "Ukraine", value: "Ukraine" },
  { label: "United Arab Emirates", value: "United Arab Emirates" },
  { label: "United Kingdom", value: "United Kingdom" },
  { label: "United States of America", value: "United States of America" },
  { label: "Uruguay", value: "Uruguay" },
  { label: "Uzbekistan", value: "Uzbekistan" },
  { label: "Vanuatu", value: "Vanuatu" },
  { label: "Venezuela", value: "Venezuela" },
  { label: "Vietnam", value: "Vietnam" },
  { label: "Yemen", value: "Yemen" },
  { label: "Zambia", value: "Zambia" },
  { label: "Zimbabwe", value: "Zimbabwe" },
]
