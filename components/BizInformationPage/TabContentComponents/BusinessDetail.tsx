import Break from "components/Break/Break";
import SectionLayout from "components/SectionLayout/SectionLayout";
import { Categories } from "enums";
import { IAddListingForm } from "pages/add-listing";
import BusinessDetailBuy from "./BusinessDetailCategories/BusinessDetailBuy";
import BusinessDetailEat from "./BusinessDetailCategories/BusinessDetailEat";
import BusinessDetailSeeAndDo from "./BusinessDetailCategories/BusinessDetailSeeAndDo";
import BusinessDetailTransport from "./BusinessDetailCategories/BusinessDetailTransport";
import BusinessDetailStay from "./BusinessDetailCategories/BusinessDetailStay";
import { useState } from "react";
import { bizInformationDefaultFormData } from "constant";
import { get, map } from "lodash";

interface BusinessDetailProps {
  listing: any;
  loading?: boolean;
  onSubmit: (data: any) => void;
}

const BusinessDetail = (props: BusinessDetailProps) => {
  const { listing, loading, onSubmit } = props;

  const viewBusinessDetailData = {
    categoryLinks: get(listing, "category_links[0]"),
    productTypes: get(listing, "product_types"),
    productBrands: get(listing, "product_brands"),
    openHours: get(listing, "open_hours"),
    minPrice: get(listing, "price_range.min"),
    maxPrice: get(listing, "price_range.max"),
    currency: get(listing, "price_range.currency"),
    describeTags: get(listing, "tags").map((item) => item.id?.toString()),
    describeTagLabels: get(listing, "tags").map((item) => item.label),

    additionalServices: get(listing, "facilities_data.additionalServices"),
    atmosphere: get(listing, "facilities_data.atmosphere"),
    foodOptions: get(listing, "facilities_data.foodOptions"),
    foodOptionsRamadan: get(listing, "facilities_data.foodOptionsRamadan"),
    mealsKind: get(listing, "facilities_data.mealsKind"),
    nonHalalActivities: get(listing, "facilities_data.nonHalalActivities"),
    parking: get(listing, "facilities_data.parking"),
    paryerFacilities: get(listing, "facilities_data.paryerFacilities"),
    payment: get(listing, "facilities_data.payment"),
    placeGoodFor: get(listing, "facilities_data.placeGoodFor"),
  };

  console.log("viewBusinessDetailData", viewBusinessDetailData);

  const submitFormData = (formData) => {
    console.log("aaasasdasdasdas", formData);
    const businessDetailFormattedData = {
      category_links: formData.categoryLinks,
      price_range: {
        currency: formData.currency?.value || formData.currency,
        min: formData.minPrice,
        max: formData.maxPrice,
      },
      product_types:
        formData.category === 1
          ? formData.productTypes
          : map(formData.productTypes, "value"),
      product_brands:
        formData.category === 1 ? map(formData.productBrands, "value") : null,
      tags: formData.describeTags || [],
      facilities_data: {
        additionalServices: formData.additionalServices,
        atmosphere: formData.atmosphere,
        foodOptions: formData.foodOptions,
        foodOptionsRamadan: formData.foodOptionsRamadan,
        mealsKind: formData.mealsKind,
        nonHalalActivities: formData.nonHalalActivities,
        parking: formData.parking,
        paryerFacilities: formData.paryerFacilities,
        payment: formData.payment,
        placeGoodFor: formData.placeGoodFor,
      },
      open_hours: formData.openHours,
    };
    onSubmit(businessDetailFormattedData);
  };

  const renderBusinessDetail = () => {
    let detail;
    switch (get(listing, "categories[0].id")) {
      case Categories.BUY:
        detail = (
          <BusinessDetailBuy
            formData={viewBusinessDetailData}
            submitFormData={submitFormData}
          />
        );
        break;
      case Categories.EAT:
        detail = (
          <BusinessDetailEat
            formData={viewBusinessDetailData}
            submitFormData={submitFormData}
          />
        );
        break;
      // case Categories.SEE_AND_DO:
      //   detail = (
      //     <BusinessDetailSeeAndDo
      //       formData={formData}
      //       submitFormData={submitFormData}
      //     />
      //   );
      //   break;
      // case Categories.TRANSPORT:
      //   detail = (
      //     <BusinessDetailTransport
      //       formData={formData}
      //       submitFormData={submitFormData}
      //     />
      //   );
      //   break;
      // case Categories.STAY:
      //   detail = (
      //     <BusinessDetailStay
      //       formData={formData}
      //       submitFormData={submitFormData}
      //     />
      //   );
      //   break;
      default:
        detail = <div></div>;
        break;
    }
    return detail;
  };

  return renderBusinessDetail();
};

export default BusinessDetail;
