export enum Categories {
  BUY = 1,
  EAT = 2,
  SEE_AND_DO = 3,
  TRANSPORT = 4,
  STAY = 5,
  OTHER = "Other",
}

export enum CategoryText {
  BUY = "buy",
  EAT = "eat",
  SEE_AND_DO = "see-and-do",
  TRANSPORT = "transport",
  STAY = "stay",
  OTHER = "Other",
}

export enum YesNo {
  YES = "Yes",
  NO = "No",
}

export enum VerifySteps {
  REQUEST_OTP = "request_otp",
  CONFIRM_OTP = "confirm_otp",
  ADD_ID_CARD = "add_id_card",
  ADD_PAYMENT = "add_payment",
}

export enum Tiers {
  FREE = "free",
  BASIC = "basic",
  PREMIUM = "premium",
}

export enum ListingTabs {
  SERVICE = "services",
  PRODUCT = "products",
  DISH = "dishes",
  MENU = "menu",
  DEAL = "deals",
}

export enum ListingHomePageScreens {
  HOME = "home",
  ADD_ITEMS = "add-items",
  ADD_MENU = "add-menu",
  ADD_DEALS = "add-deals",
}

export enum InformationList {
  BUSINESS_INFORMATION = "Business information",
  BUSINESS_DETAIL = "Business  detail",
  PHOTOS_VIDEOS = "Photos/videos",
  PRODUCT_LISTING = "Products listing",
  MANAGE_DEALS = "Manage deals",
  ANALYTICS = "Analytics",
  CHANGE_ACCOUNT_TIER = "Change account tier",
  VERIFICATION = "Verification",
  LOGOUT = "Log out",
}

export enum UserInformationList {
  USER_INFORMATION = "User information",
  CHANGE_PASSWORD = "Change password",
  NOTIFICATION_SETTINGS = "Notification settings",
  REFERRAL_CODE = "Referral code",
  POINT_HISTORY = "Point history",
  TRIBES_FOR_BUSINESSES = "Tribes for Businesses",
  SUPPORT = "Support",
  TERMS_CONDITIONS = "Terms & Conditions",
  LOGOUT = "Log out",
}

export enum ClaimStep {
  CLAIM_FREE_LISTING = "claim_free_listing",
  CHOOSE_TIER = "choose_tierr",
}

export enum UserType {
  NORMAL_USER = "normal_user",
  BIZ_USER = "biz_user",
}

export enum ProfileTabs {
  FAVOURITED = "favourited",
  SAVED_DEALS = "saved-deals",
  CONTRIBUTED = "contributed",
  ABOUT = "about",
}

export enum ProfileTabFavourited {
  EAT = "eat",
  BUY = "buy",
  SEE_DO = "see-and-do",
  TRANSPORT = "transport",
  STAY = "stay",
}
