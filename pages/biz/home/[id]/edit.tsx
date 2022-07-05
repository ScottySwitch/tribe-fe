import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";

import Icon from "components/Icon/Icon";
import Details from "components/BizHomePage/Details/Details";
import EditAction from "components/BizHomePage/EditAction/EditAction";
import ListingInforCard from "components/BizHomePage/ListingInforCard/ListingInforCard";
import OnboardChecklist from "components/BizHomePage/OnboardChecklist/OnboardChecklist";
import RenderTabs from "components/BizHomePage/RenderTabs/RenderTabs";
import SectionLayout from "components/SectionLayout/SectionLayout";
import Upload from "components/Upload/Upload";
import { Categories, ListingHomePageScreens } from "enums";
import BizListingApi from "../../../../services/biz-listing";
import AddMenu from "components/BizInformationPage/TabContentComponents/AddMenu/AddMenu";
import AddItems from "components/BizInformationPage/TabContentComponents/AddItems/AddItems";
import AddDeals from "components/BizInformationPage/TabContentComponents/AddDeal/AddDeals";
import TagApi from "services/tag";
import FacilityApi from "services/facility";
import ReviewApi from "services/review";

import styles from "styles/BizHomepage.module.scss";
import Facilities from "components/BizHomePage/Facilities/Facilities";
import { IOption } from "type";
import Tags from "components/BizHomePage/Tags/Tags";
import HomeOpenHours from "components/BizHomePage/HomeOpenHours/HomeOpenHours";
import { getAddItemsFields } from "constant";
import ProductApi from "../../../../services/product";
import MenuApi from "../../../../services/menu";
import DealApi from "../../../../services/deal";
import BizListingRevision from "services/biz-listing-revision";
import get from "lodash/get";
import moment from "moment";
import parseISO from "date-fns/parseISO";
import Break from "components/Break/Break";
import Contacts from "components/BizHomePage/Contacts/Contacts";
import HomepageReviews from "components/BizHomePage/HomepageReviews/HomepageReviews";
import { now } from "lodash";
import { IAddListingForm } from "pages/add-listing";

const CenterIcon = () => (
  <div className="flex flex-col items-center gap-1">
    <Icon icon="camera-color" size={40} />
    <p>Add photos/ videos</p>
  </div>
);

const EditListingHomepage = (props: { isViewPage?: boolean }) => {
  const { isViewPage } = props;
  const [category, setCategory] = useState(Categories.EAT);
  const [screen, setScreen] = useState(ListingHomePageScreens.HOME);
  const [description, setDescription] = useState<string>("");
  const [facilities, setFacilities] = useState<IAddListingForm | undefined>();
  const [facilityOptions, setFacilityOptions] = useState<IOption[]>([]);
  const [tags, setTags] = useState<IOption[]>([]);
  const [tagOptions, setTagOptions] = useState<IOption[]>([]);
  const [openHours, setOpenHours] = useState([]);
  const [reviews, setReviews] = useState<{ [key: string]: any }[]>([]);
  const [listingRate, setListingRate] = useState(1);
  const [priceRange, setPriceRange] = useState({
    min: "",
    max: "",
    currency: "",
  });
  const [socialInfo, setSocialInfo] = useState<any>("");
  const [phoneNumber, setPhoneNumber] = useState<any>("");
  const [action, setAction] = useState({ label: "", value: "" });
  const [itemList, setItemList] = useState<{ [key: string]: any }[]>([]);
  const [menuList, setMenuList] = useState<{ [key: string]: any }[]>([]);
  const [dealList, setDealList] = useState<{ [key: string]: any }[]>([]);
  const [bizInvoices, setBizInvoices] = useState<{ [key: string]: any }[]>([]);
  const [facilitiesData, setFacilitiesData] = useState();

  const [bizListing, setBizListing] = useState<any>({});
  const [listingImages, setListingImages] = useState<any>([]);
  const [logo, setLogo] = useState<any>([]);

  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRevision, setIsRevision] = useState<boolean>(false);

  const router = useRouter();
  const { query } = router;
  const { id: listingSlug } = query;

  const formatOptions = (list) =>
    list.map((item: any) => ({
      label: item.label,
      value: item.value,
      id: item.id,
    }));

  useEffect(() => {
    const getListingData = async (listingSlug) => {
      let data;
      let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
      if (isViewPage) {
        //if normal user go to normal listing homepage
        data = await BizListingApi.getBizListingBySlug(listingSlug);
      } else {
        //if normal users go to edit listing homepage
        data = await BizListingApi.getInfoOwnerBizListingBySlug(listingSlug)
        if (get(data, "data.is_revision") === true) {
          console.log('revision');
          setIsRevision(true)
        }
        get(data, "data.biz_invoices.length") !== 0 && setIsPaid(true)
        //they will be redirected to home if do not own the listing
        get(data, "data.is_owner") !== true && (window.location.href = "/")
      }

      const listing = get(data, 'data.data[0]')
      if (listing) {
        listing.biz_invoices.length !== 0
        console.log(listing);
        userInfo.now_biz_listing = listing;
        localStorage.setItem("user", JSON.stringify(userInfo));
        const rawTags = listing.tags || [];
        const rawFacilities = listing.facilities_data || [];
        const invoiceList = listing.biz_invoices.data || [];
        const rawPhoneNumber = listing.phone_number;
        const defaultPhone = rawPhoneNumber
          ? rawPhoneNumber.substring(0, 2) +
            "XXXXXX" +
            rawPhoneNumber.substring(7)
          : "";
        const rawListing = listing.products || [];
        const listingArray = rawListing.map((item) => ({
          name: item.name,
          is_revision: item.is_revision,
          parent_id: item.parent_id,
          price: item.price,
          id: item.id,
          description: item.description,
          images: item.images,
          imgUrl: item.images[0],
          discount: item.discount_percent,
          tags: item.tags,
          websiteUrl: item.website_url,
          klookUrl: item.klook_url,
          isEdited: false,
        }));
        const rawMenu = listing.menus || [];
        const menuArray = rawMenu.map((item) => ({
          id: item.id,
          is_revision: item.is_revision,
          parent_id: item.parent_id,
          name: item.name,
          images: item.menu_file,
          imgUrl: item.menu_file[0],
          isChange: false,
        }));
        const rawDeal = listing.deals || [];
        const dealArray = rawDeal.map((item) => ({
          id: item.id,
          is_revision: item.is_revision,
          parent_id: item.parent_id,
          name: item.name,
          images: item.images,
          imgUrl: item.images[0],
          information: item.description,
          termsConditions: item.terms_conditions,
          // start_date: item.start_date,
          // end_date: moment(item.nd_date')).format("YYYY-MM-DD HH:mm:ss,
          validUntil: parseISO(
            moment(item.end_date).format(
              "YYYY-MM-DD HH:mm:ss"
            )
          ),
          isChange: false,
        }));
        const rawBizInvoices = listing.biz_invoices || [];
        const bizInvoicesArray = rawBizInvoices.map((item) => ({
          id: item.id,
        }));
        const tagArray = formatOptions(rawTags);
        // const arrayFacilities = formatOptions(rawFacilities);

        setBizListing(listing);
        setAction(listing.action);
        setListingImages(listing.images);
        setCategory(
          listing.categories[0].id || Categories.BUY
        );
        setDescription(listing.description);
        setOpenHours(listing.open_hours);
        setPriceRange(listing.price_range);
        setSocialInfo(listing.social_info);
        setDealList(listing.deals.data);  
        setFacilitiesData(listing.facilities_data);
        setLogo(listing.logo);
        setTags(tagArray);
        setFacilities(rawFacilities);
        setItemList(listingArray);
        setMenuList(menuArray);
        setDealList(dealArray);
        setBizInvoices(bizInvoicesArray);
        setListingRate(listing.rate);
        if (invoiceList.length > 0) {
          setPhoneNumber(defaultPhone);
        } else {
          setPhoneNumber(rawPhoneNumber);
        }
      }
    };

    if (listingSlug) {
      getListingData(listingSlug);
      getTags();
      getFacilities();
      getBizListingReviews(listingSlug, "rating:desc");
    }
  }, [listingSlug, isViewPage]);

  const getBizListingReviews = async (listingSlug, sortBy) => {
    const data = await ReviewApi.getReviewsByBizListingSlugWithSort(
      listingSlug,
      sortBy
    );
    const rawReview = get(data, "data.data") || [];
    const reviewArray = rawReview.map((item) => ({
      id: item.id,
      biz_listing: get(item, "attributes.biz_listing"),
      content: get(item, "attributes.content"),
      rating: get(item, "attributes.rating"),
      images: get(item, "attributes.images"),
      reply_reviews: get(item, "attributes.reply_reviews"),
      date_create_reply: get(item, "attributes.date_create_reply"),
      user: get(item, "attributes.user"),
      visited_date: get(item, "attributes.visited_date"),
    }));
    setReviews(reviewArray);
  };

  const handleChangeReviewsSequence = async ({ value }: IOption) => {
    if (value === "top") {
      await getBizListingReviews(listingSlug, "rating:desc");
    } else {
      await getBizListingReviews(listingSlug, "id:desc");
    }
  };

  //Get tags
  const getTags = async () => {
    const data = await TagApi.getTags();
    const tagsList = get(data, "data.data") || [];
    const tagArray = tagsList.map((item) => ({
      label: item.attributes.label,
      value: item.attributes.value,
      id: item.id,
    }));
    setTagOptions(tagArray);
  };

  //Get Facility
  const getFacilities = async () => {
    const data = await FacilityApi.getFacility();
    const facilitiesList = get(data, "data.data") || [];
    const facilitiesArray = facilitiesList.map((item) => ({
      label: item.attributes.label,
      value: item.attributes.value,
      id: item.id,
    }));
    setFacilityOptions(facilitiesArray);
  };

  // TODO: check function upload multiple images
  const handleChangeImages = (srcImages) => setListingImages(srcImages);
  const handleChangeLogo = (srcImages) => setLogo(srcImages);
  const handleSetPriceRange = (priceRange) => setPriceRange(priceRange);
  const handleSetSocialInfo = (socialInfo) => setSocialInfo(socialInfo);
  const handleSetPhoneNumber = (phoneNumber) => setPhoneNumber(phoneNumber);
  const handleSetDescription = (description) => setDescription(description);
  const handleSetFacilities = (facilities) => setFacilities(facilities);
  const handleSetTags = (tags) => setTags(tags);
  const handleSetOpenHours = (openHours) => setOpenHours(openHours);
  const handleSetAction = (action: string, value: string) =>
    setAction({ label: action, value: value });
  const handleSetItemList = (list: { [key: string]: string }[]) => {
    setItemList(list);
    setScreen(ListingHomePageScreens.HOME);
  };
  const handleSetDealList = (dealList: { [key: string]: string }[]) => {
    setDealList(dealList);
    setScreen(ListingHomePageScreens.HOME);
  };
  const handleSetMenu = (menu) => {
    setMenuList(menu);
    setScreen(ListingHomePageScreens.HOME);
  };
  const handleCancel = () => setScreen(ListingHomePageScreens.HOME);

  const handleSubmitReply = (reply, review) => {
    const newReviewArray: { [key: string]: any }[] = reviews;
    const indexReviewSelected = newReviewArray.findIndex(
      (item: any) => item.id === review.id
    );
    newReviewArray[indexReviewSelected].reply_reviews = reply;
    newReviewArray[indexReviewSelected].date_create_reply = new Date();
    setReviews(newReviewArray);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    let bizListingRevisionCreateId;
    const currentItemList = [...itemList].filter(
      (item) => !item.isNew && !item.isEdited
    );
    const currentMenuList = [...menuList].filter(
      (item) => !item.isNew && !item.isEdited
    );
    const currentDealList = [...dealList].filter(
      (item) => !item.isNew && !item.isEdited
    );
    const newItemList = itemList.filter((item) => item.isNew);
    const editedItemList = itemList.filter(
      (item) => !item.isNew && item.isEdited
    );
    const newMenuList = menuList.filter((item) => item.isNew);
    const editedMenuList = menuList.filter(
      (item) => !item.isNew && item.isEdited
    );
    const newDealList = dealList.filter((item) => item.isNew);
    const editedDealList = dealList.filter(
      (item) => !item.isNew && item.isEdited
    );
    console.log(isRevision);
    if (isRevision) {
      await BizListingRevision.updateBizListingRevision(bizListing.id, {
        description: description,
        price_range: priceRange,
        action: action,
        images: listingImages,
        social_info: socialInfo,
        phone_number: phoneNumber,
        facilities_data: facilitiesData,
        facilities: facilities,
        open_hours: openHours,
        tags: tags.map((item) => item.id),
        is_verified: false,
        logo: logo,
        is_accepted: false,
        products: currentItemList.map((item) => item.id) || [],
        menus: currentMenuList.map((item) => item.id) || [],
        deals: currentDealList.map((item) => item.id) || [],
      }).then((response) => {
        console.log(response);
      });
    } else {
      await BizListingRevision.createBizListingRevision({
        name: get(bizListing, "name"),
        slug: get(bizListing, "slug"),
        biz_listing: bizListing.id.toString(),
        parent_id: bizListing.id.toString(),
        description: description,
        price_range: priceRange,
        action: action,
        images: listingImages,
        social_info: socialInfo,
        phone_number: phoneNumber,
        facilities_data: facilitiesData,
        facilities: facilities,
        open_hours: openHours,
        tags: tags.map((item) => item.id),
        is_verified: false,
        is_accepted: false,
        logo: logo,
        products: currentItemList.map((item) => item.id) || [],
        menus: currentMenuList.map((item) => item.id) || [],
        deals: currentDealList.map((item) => item.id) || [],
        biz_invoices: bizInvoices.map((item) => item.id) || [],
        categories:
          get(bizListing, "categories.data").map(
            (item) => item.id
          ) || [],
      }).then((response) => {
        console.log(response);
        bizListingRevisionCreateId = response.data.data.id;
      });
    }

    //API ItemList
    await Promise.all(
      newItemList.map(async (item) => {
        const CreateData = {
          biz_listing_revision: bizListingRevisionCreateId || bizListing.id,
          name: item.name,
          description: item.description,
          price: item.price,
          discount_percent: item.discount,
          tags: item.tags,
          images: item.images,
          website_url: item.websiteUrl,
          klook_url: item.klookUrl,
          is_revision: true,
        };
        await ProductApi.createProduct(CreateData);
      })
    );
    await Promise.all(
      editedItemList.map(async (item) => {
        const parent_id = !item.is_revision
          ? item.id
          : item.parent_id
          ? item.parent_id
          : "";
        const updateData = {
          biz_listing_revision: bizListingRevisionCreateId || bizListing.id,
          name: item.name,
          description: item.description,
          price: item.price,
          discount_percent: item.discount,
          tags: item.tags,
          images: item.images,
          website_url: item.websiteUrl,
          klook_url: item.klookUrl,
          is_revision: true,
          parent_id: parent_id,
        };
        item.is_revision
          ? await ProductApi.updateProduct(item.id, updateData)
          : await ProductApi.createProduct(updateData);
      })
    );

    //API MenuList
    await Promise.all(
      newMenuList.map(async (item) => {
        const CreateData = {
          biz_listing_revision: bizListingRevisionCreateId || bizListing.id,
          name: item.name,
          menu_file: item.images,
          is_revision: true,
        };
        await MenuApi.createMenu(CreateData);
      })
    );
    await Promise.all(
      editedMenuList.map(async (item) => {
        const parent_id = !item.is_revision
          ? item.id
          : item.parent_id
          ? item.parent_id
          : "";
        const updateData = {
          biz_listing_revision: bizListingRevisionCreateId || bizListing.id,
          name: item.name,
          menu_file: item.images,
          is_revision: true,
          parent_id: parent_id,
        };
        item.is_revision
          ? await MenuApi.updateMenu(item.id, updateData)
          : await MenuApi.createMenu(updateData);
      })
    );

    //API DealList
    await Promise.all(
      newDealList.map(async (item) => {
        let convertEndDate =
          moment(item.validUntil).format("YYYY-MM-DD") + "T:00:00.000Z";
        const CreateData = {
          biz_listing_revision: bizListingRevisionCreateId || bizListing.id,
          name: item.name,
          description: item.information,
          images: item.images,
          terms_conditions: item.termsConditions,
          start_date: item.validUntil,
          end_date: convertEndDate,
          is_revision: true,
        };
        await DealApi.createDeal(CreateData);
      })
    );
    await Promise.all(
      editedDealList.map(async (item) => {
        const parent_id = !item.is_revision
          ? item.id
          : item.parent_id
          ? item.parent_id
          : "";
        let convertEndDate =
          moment(item.validUntil).format("YYYY-MM-DD") + "T:00:00.000Z";
        const updateData = {
          biz_listing_revision: bizListingRevisionCreateId || bizListing.id,
          name: item.name,
          description: item.information,
          images: item.images,
          terms_conditions: item.termsConditions,
          end_date: convertEndDate,
          is_revision: true,
          parent_id: parent_id,
        };
        item.is_revision
          ? await DealApi.updateDeal(item.id, updateData)
          : await DealApi.createDeal(updateData);
      })
    );

    //API Reviews
    await Promise.all(
      reviews.map(async (item) => {
        const updateData = {
          images: item.images,
          visited_date: item.visited_date,
          rating: item.rating,
          content: item.content,
          reply_reviews: item.reply_reviews,
          date_create_reply: item.date_create_reply,
        };
        await ReviewApi.updateReviews(item.id, updateData);
      })
    );
    window.location.reload();
  };

  return (
    bizListing && (
      <div className={styles.listing_homepage}>
        <SectionLayout show={screen === ListingHomePageScreens.HOME}>
          <Upload
            className={styles.banner}
            centerIcon={<CenterIcon />}
            onChange={handleChangeImages}
            type="banner"
            isPaid
            fileList={listingImages}
          />
          <div className={styles.breadcrumbs}>
            Home <Icon icon="carret-right" size={14} color="#7F859F" />
            {bizListing.name}
          </div>
          <ListingInforCard
            isViewPage={isViewPage}
            logo={logo}
            handleChangeLogo={handleChangeLogo}
            bizListing={bizListing}
            priceRange={priceRange}
            socialInfo={socialInfo}
            phoneNumber={phoneNumber}
            onSetPriceRange={handleSetPriceRange}
            onSetSocialInfo={handleSetSocialInfo}
            onSetPhoneNumber={handleSetPhoneNumber}
          />
          <div className={styles.body}>
            <div className={styles.right_col}>
              <EditAction
                isOwned={true}
                isViewPage={isViewPage}
                isLoading={isLoading}
                isPaid={isPaid}
                action={action}
                onApplyAction={handleSetAction}
                onPublishPage={handleSubmit}
              />
            </div>
            <div className={styles.left_col}>
              <Break show={!isViewPage} />
              {!isViewPage && <OnboardChecklist />}
              <Break show={!isViewPage} />
              <Details
                isViewPage={isViewPage}
                description={description}
                onSetDescription={handleSetDescription}
              />
              <Break show={!isViewPage} />
              <Facilities
                category={category}
                isViewPage={isViewPage}
                facilities={facilitiesData}
                onSetFacilities={handleSetFacilities}
                // facilityOptions={facilityOptions}
              />
              <Break show={!isViewPage} />
              <Tags
                isViewPage={isViewPage}
                tags={tags}
                onSetTags={handleSetTags}
                tagOptions={tagOptions}
              />
              <Break show={!isViewPage} />
              <HomeOpenHours
                isViewPage={isViewPage}
                openHours={openHours}
                onSetOpenHours={handleSetOpenHours}
              />
              <Break />
              <div>
                <RenderTabs
                  isViewPage={isViewPage}
                  isPaid={isPaid}
                  menuList={menuList}
                  category={category}
                  itemList={itemList}
                  dealList={dealList}
                  onSetScreen={(e) => setScreen(e)}
                  onDelete={(e) => console.log(e)}
                />
              </div>
              <Break />
              <HomepageReviews
                listingSlug={listingSlug}
                listingRate={listingRate}
                isPaid={isPaid}
                isViewPage={isViewPage}
                reviews={reviews}
                onSubmitReply={(value, id) => handleSubmitReply(value, id)}
                onChangeReviewsSequence={handleChangeReviewsSequence}
              />
              <Break />
              <Contacts />
            </div>
          </div>
        </SectionLayout>
        <SectionLayout
          show={screen === ListingHomePageScreens.ADD_ITEMS}
          title={getAddItemsFields(category).title}
          childrenClassName=" w-full sm:w-3/4 xl:w-1/2"
        >
          <AddItems
            isPaid={isPaid}
            multiple
            onSubmit={handleSetItemList}
            onCancel={handleCancel}
            itemList={itemList}
            placeholders={getAddItemsFields(category).placeholder}
          />
        </SectionLayout>
        <SectionLayout
          show={screen === ListingHomePageScreens.ADD_MENU}
          title="Add a menu"
          childrenClassName=" w-full sm:w-3/4 xl:w-1/2"
        >
          <AddMenu
            isPaid={isPaid}
            multiple={true}
            menuList={menuList}
            onCancel={handleCancel}
            onSubmit={handleSetMenu}
          />
        </SectionLayout>
        <SectionLayout
          show={screen === ListingHomePageScreens.ADD_DEALS}
          title="Add deals"
          childrenClassName=" w-full sm:w-3/4 xl:w-1/2"
        >
          <AddDeals
            isPaid={isPaid}
            multiple
            onCancel={handleCancel}
            onSubmit={handleSetDealList}
            dealList={dealList}
          />
        </SectionLayout>
      </div>
    )
  );
};

export async function getServerSideProps(context) {
  // Pass data to the page via props
  return {
    props: {},
  };
}

export default EditListingHomepage;
