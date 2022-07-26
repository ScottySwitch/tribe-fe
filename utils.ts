import { get } from "lodash";
import { IOption } from "type";
import moment from "moment";
import parseISO from "date-fns/parseISO";
import { locations, videoExtensions } from "constant";
import { format } from "path";

export const detectIsVideo = (src: string | Blob) => {
  if (typeof src === "string") {
    return videoExtensions.some((item) => src?.includes(item));
  } else {
    // console.log(src.type);
  }
};

export const getIndex = (id, list) => {
  return list.findIndex((item) => item.id === id);
};

export const randomId = () => Math.floor(Math.random() * 10000000);

export const monthOfTwoYearsOptions = () => {
  const startDate = moment(new Date()).subtract(2, "year").subtract(1, "month");
  var startMonth = moment(startDate); //clone the startDate

  const now = moment(new Date());

  var dates: string[] = [];
  while (startMonth < now) {
    startMonth.add(1, "month");
    dates.push(startMonth.format("YYYY-MM"));
  }

  const monthsOfTwoYearsOptions = dates.map((item) => ({
    label: moment(item).format("MMMM YYYY"),
    value: item,
  }));

  return monthsOfTwoYearsOptions;
};

export const calcRateNumber = (reviewsData) => {
  let rateNumber = 0;
  if (reviewsData && reviewsData.length > 0) {
    let sum = 0;
    reviewsData.map((review) => {
      sum += get(review, "attributes.rating") || 0;
    });
    rateNumber = Math.ceil(sum / reviewsData.length);
  } else {
    rateNumber = 0;
  }
  return rateNumber;
};

export const removeZeroInPhoneNumber = (e) => {
  let phoneNumber = "";
  if (e.input[0] == 0) {
    phoneNumber = e?.select?.value + e?.input?.substr(1, e.input.length - 1);
  } else {
    phoneNumber = e?.select?.value + e?.input;
  }
  console.log("phone string", phoneNumber);
  return phoneNumber;
};

export const formatSelectInputValue = (e: string, selectOptions: IOption[]) => {
  if (!e) {
    return;
  }
  const phoneCodeValueList = Object.values(
    selectOptions.map((item) => item.value)
  );
  const codeOptionIndex = phoneCodeValueList.findIndex((code) =>
    e.includes(code)
  );
  const selectValue = selectOptions[codeOptionIndex]?.value;
  const inputValue = e.substring(selectValue?.length);
  return { select: selectOptions[codeOptionIndex], input: inputValue };
};

export const getOptionsMappedFromResponse = (res) => {
  const rawArray = get(res, "data.data") || [];
  if (Array.isArray(rawArray)) {
    return rawArray.map((item) => ({
      value: item.id,
      label: get(item, "attributes.label"),
    }));
  }
};

export const calcDistanceFromNow = (time) => {
  const timeCalcDistance = parseISO(moment(time).format("YYYY-MM-DD HH:mm:ss"));
  let diff_in_minutes = moment().diff(moment(timeCalcDistance), "minutes");
  let diff_in_hours = Math.floor(diff_in_minutes / 60);
  let diff_in_days = Math.floor(diff_in_minutes / 1440);
  if (diff_in_hours < diff_in_minutes / 60) {
    diff_in_hours = diff_in_hours + 1;
  }
  if (diff_in_days < diff_in_minutes / 1440) {
    diff_in_days = diff_in_days + 1;
  }
  if (diff_in_minutes == 0) {
    return "few second ago";
  } else if (diff_in_minutes < 60 && diff_in_minutes == 1) {
    return "1 minute ago";
  } else if (diff_in_minutes < 60 && diff_in_minutes != 1) {
    return `${diff_in_minutes} minutes ago`;
  } else if (diff_in_hours < 24 && diff_in_hours == 1) {
    return "1 hour ago";
  } else if (diff_in_hours < 24 && diff_in_hours != 1) {
    return `${diff_in_hours} hours ago`;
  } else if (diff_in_days == 1) {
    return "1 day ago";
  } else {
    return `${diff_in_days} days ago`;
  }
};

export const formatListingArray = (rawListing) =>
  Array.isArray(rawListing)
    ? rawListing.map((item) => ({
        images: get(item, "images") || [],
        title: get(item, "name"),
        slug: get(item, "slug"),
        isVerified: get(item, "is_verified"),
        address: get(item, "address"),
        country: get(item, "country"),
        description: get(item, "description"),
        followerNumber: get(item, "user_listing_follows.length"),
        tags: get(item, "tags"),
        categories: get(item, "categories"),
        price: get(item, "min_price") || "",
        // currency: get(get(item, "price_range.currency") || "",
        currency: get(item, "currency") || "",
        rate: get(item, "rating"),
        rateNumber: get(item, "rate_number"),
      }))
    : [];

export const isArray = (item) => {
  return Array.isArray(item) && item.length > 0;
};

export const changeToSlugify = (str) => {
  return str
    .trim()
    .toLowerCase()
    .replace(" ", "-")
    .replace("'", "-")
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const isPaidUser = (time) => {
  const timeCalcDistance = parseISO(moment(time).format("YYYY-MM-DD HH:mm:ss"));
  let diff_in_minutes = moment().diff(moment(timeCalcDistance), "minutes");
  return diff_in_minutes < 0 ? true : false
};


export const censoredPhoneNumber = (phoneNumber) => {
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  const phoneArray = phoneNumber ? phoneNumber.split("") : [];

  for (let i = 2; i < phoneArray.length - 4; i++) {
    if (numbers.includes(phoneArray[i].toString())) {
      phoneArray[i] = "X";
    }
  }

  return phoneArray.join("");
};

export const getBrowserLocation = async () => {
  const locationData = await fetch(
    "https://www.cloudflare.com/cdn-cgi/trace"
  ).then((res) => res.text());

  if (!locationData.trim()) {
    return;
  }

  let data = locationData.replace(/[\r\n]+/g, '","').replace(/\=+/g, '":"');
  data = '{"' + data.slice(0, data.lastIndexOf('","')) + '"}';
  var userLocation = JSON.parse(data).loc?.toLowerCase();
  const locationOption = locations.find(
    (country) => country.code === userLocation
  );

  return locationOption?.value;
};

export const isEmptyObject = (item: any) => {
  const arrayValues = Object.values(item);
  for (let index = 0; index < arrayValues.length; index++) {
    const element = arrayValues[index];
    if (Array.isArray(element)) {
      if (isArray(element)) {
        return true;
      }
    } else {
      if (element !== null) return true;
    }
  }
  return false;
};

export const formatBizlistingArray = (rawListing) =>
  Array.isArray(rawListing)
    ? rawListing.map((item) => ({
        id: item.id,
        images: get(item, "attributes.images") || [],
        title: get(item, "attributes.name"),
        slug: get(item, "attributes.slug"),
        isVerified: get(item, "attributes.is_verified"),
        address: get(item, "attributes.address"),
        country: get(item, "attributes.country"),
        description: get(item, "attributes.description"),
        followerNumber: get(item, "attributes.user_listing_follows.length"),
        tags: arrayLabeltags(get(item, "attributes.tags.data")),
        categories: arrayLabelCategory(get(item, "attributes.categories.data")),
        price: get(item, "attributes.min_price") || "",
        currency: get(item, "attributes.currency") || "",
        rate: get(item, "attributes.rating"),
        rateNumber: get(item, "attributes.tags.data.length"),
      }))
    : [];

export const formatBanner = (rawBanner) =>
  Array.isArray(rawBanner)
    ? rawBanner.map((item) => ({
        imgUrl: get(item, "attributes.image.data.attributes.url"),
        linkActive: get(item, "attributes.link_active"),
      }))
    : [];

export const formatCollections = (rawCollections) =>
  Array.isArray(rawCollections)
    ? rawCollections.map((item) => ({
        imgUrl: get(item, "attributes.thumbnail.data.attributes.url"),
        slug: get(item, "attributes.slug"),
        title: get(item, "attributes.name"),
      }))
    : [];

export const formatArticle = (rawArticle) =>
  Array.isArray(rawArticle)
    ? rawArticle.map((item) => ({
        title: get(item, "attributes.name") || null,
        imgUrl: get(item, "attributes.thumbnail.data.attributes.url"),
        time: get(item, "attributes.createdAt"),
        slug: get(item, "attributes.slug"),
      }))
    : [];

export const formatCategoryLink = (rawCategoryLink) =>
  Array.isArray(rawCategoryLink)
    ? rawCategoryLink.map((item) => ({
        icon: get(item, "attributes.logo.data.attributes.url") || null,
        label: get(item, "attributes.label"),
        value: get(item, "attributes.value"),
        slug: get(item, "attributes.value"),
      }))
    : [];

export const arrayLabeltags = (rawTag) =>
  Array.isArray(rawTag)
    ? rawTag.map((item) => get(item, "attributes.label"))
    : [];

export const arrayLabelCategory = (rawCategory) =>
  Array.isArray(rawCategory)
    ? rawCategory.map((item) => get(item, "attributes.name"))
    : [];
