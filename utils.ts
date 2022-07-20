import { get } from "lodash";
import { IOption } from "type";
import moment from "moment";
import parseISO from "date-fns/parseISO";
import { locations } from "constant";

export const getIndex = (id, list) => {
  return list.findIndex((item) => item.id === id);
};

export const randomId = () => Math.floor(Math.random() * 10000000);

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
    phoneNumber = e.select.value + e.input.substr(1, e.input.length - 1);
  } else {
    phoneNumber = e.select.value + e.input;
  }
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
        images: item.images || [],
        title: item.name,
        slug: item.slug,
        isVerified: item.is_verified,
        address: item.address,
        country: item.country,
        description: item.description,
        followerNumber: item.user_listing_follows.length,
        tags: item.tags,
        categories: item.categories,
        price: item.min_price || "",
        // currency: get(item, "price_range.currency") || "",
        currency: item.currency || "",
        rate: item.rate,
        rateNumber: item.rate_number,
      }))
    : [];

export const isArray = (item) => {
  return Array.isArray(item) && item.length > 0 ? true : false;
};

export const changeToSlugify = (str) => {
  return str
    .toLowerCase()
    .trim()
    .replace("'", "-")
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
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
  const arrayValues = Object.values(item)
  for (let index = 0; index < arrayValues.length; index++) {
    const element = arrayValues[index];
    if (Array.isArray(element)) {
      if ( (isArray(element)) ) {
        return true
      }
    }
    else {
      if (element !== null) return true
    }
  }
  return false
}