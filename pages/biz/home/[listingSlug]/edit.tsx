import get from "lodash/get";
import moment from "moment";
import parseISO from "date-fns/parseISO";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import Icon from "components/Icon/Icon";
import Details from "components/BizHomePage/Details/Details";
import EditAction from "components/BizHomePage/EditAction/EditAction";
import ListingInforCard from "components/BizHomePage/ListingInforCard/ListingInforCard";
import OnboardChecklist from "components/BizHomePage/OnboardChecklist/OnboardChecklist";
import RenderTabs from "components/BizHomePage/RenderTabs/RenderTabs";
import SectionLayout from "components/SectionLayout/SectionLayout";
import { Categories, ListingHomePageScreens } from "enums";
import BizListingApi from "../../../../services/biz-listing";
import AddMenu from "components/BizInformationPage/TabContentComponents/AddMenu/AddMenu";
import AddItems from "components/BizInformationPage/TabContentComponents/AddItems/AddItems";
import AddDeals from "components/BizInformationPage/TabContentComponents/AddDeal/AddDeals";
import ReviewApi from "services/review";
import Facilities from "components/BizHomePage/Facilities/Facilities";
import { IOption } from "type";
import Tags from "components/BizHomePage/Tags/Tags";
import HomeOpenHours from "components/BizHomePage/HomeOpenHours/HomeOpenHours";
import { defaultAddlistingForm, getAddItemsFields } from "constant";
import ProductApi from "../../../../services/product";
import MenuApi from "../../../../services/menu";
import DealApi from "../../../../services/deal";
import BizListingRevision from "services/biz-listing-revision";
import Break from "components/Break/Break";
import Contacts from "components/BizHomePage/Contacts/Contacts";
import HomepageReviews from "components/BizHomePage/HomepageReviews/HomepageReviews";
import { IAddListingForm } from "pages/add-listing";
import Banner from "components/BizHomePage/Banner/Banner";
import { orderBy } from "lodash";

import styles from "styles/BizHomepage.module.scss";

const EditListingHomepage = (props: { isViewPage?: boolean }) => {
  const { isViewPage } = props;
  const [userInfo, setUserInfo] = useState<any>({});
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
  const [facilitiesData, setFacilitiesData] = useState(defaultAddlistingForm);

  const [bizListing, setBizListing] = useState<any>();
  const [listingImages, setListingImages] = useState<any>([]);
  const [logo, setLogo] = useState<any>([]);

  const [isPaid, setIsPaid] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRevision, setIsRevision] = useState<boolean>(false);

  const router = useRouter();
  const { query } = router;
  const { listingSlug } = query;

  const formatOptions = (list) =>
    Array.isArray(list)
      ? list.map((item: any) => ({
          label: item.label,
          value: item.value,
          id: item.id,
        }))
      : [];

  useEffect(() => {
    const getListingData = async (listingSlug) => {
      let data;
      let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
      if (isViewPage) {
        //if normal user go to normal listing homepage
        data = await BizListingApi.getInfoBizListingBySlug(listingSlug);
      } else {
        //if normal users go to edit listing homepage
        data = await BizListingApi.getInfoOwnerBizListingBySlug(listingSlug);
        if (get(data, "data.is_revision") === true) {
          console.log("revision");
          setIsRevision(true);
        }
        //they will be redirected to home if do not own the listing
        get(data, "data.is_owner") !== true && (window.location.href = "/");
      }
      const listing = get(data, "data.data[0]");
      if (listing) {
        console.log(listing);
        console.log("userInfo", userInfo);
        userInfo.now_biz_listing = listing;
        localStorage.setItem("user", JSON.stringify(userInfo));
        setUserInfo(userInfo);
        const rawTags = listing.tags || [];
        const rawFacilities = listing.facilities_data || [];
        const rawPhoneNumber = listing.phone_number;
        const defaultPhone = rawPhoneNumber
          ? rawPhoneNumber.substring(0, 2) +
            "XXXXXX" +
            rawPhoneNumber.substring(7)
          : "";
        let rawListing = listing.products || [];
        rawListing = orderBy(rawListing, ["is_pinned"], ["desc"]);
        const listingArray = rawListing.map((item) => ({
          name: item.name,
          is_revision: item.is_revision,
          parent_id: item.parent_id,
          price: item.price,
          id: item.id,
          description: item.description,
          images: item.images,
          imgUrl: get(item, "images[0]") || "https://picsum.photos/200/300",
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
        let rawDeal = listing.deals || [];
        rawDeal = orderBy(rawDeal, ["is_pinned"], ["desc"]);
        const dealArray = rawDeal.map((item) => ({
          id: item.id,
          is_revision: item.is_revision,
          parent_id: item.parent_id,
          name: item.name,
          images: item.images,
          imgUrl: get(item, "images[0]") || "https://picsum.photos/200/300",
          information: item.description,
          termsConditions: item.terms_conditions,
          // start_date: item.start_date,
          // end_date: moment(item.nd_date')).format("YYYY-MM-DD HH:mm:ss,
          validUntil: parseISO(
            moment(item.end_date).format("YYYY-MM-DD HH:mm:ss")
          ),
          isChange: false,
        }));
        const rawBizInvoices = listing.biz_invoices || [];
        const bizInvoicesArray = rawBizInvoices.map((item) => ({
          id: item.id,
        }));
        const tagArray = formatOptions(rawTags);

        const rawReview = listing.reviews || [];
        const reviewArray = rawReview.map((item) => ({
          id: item.id,
          content: item.content,
          rating: item.rating,
          images: item.images,
          reply_reviews: item.reply_reviews,
          date_create_reply: item.date_create_reply,
          user: item.user,
          visited_date: item.visited_date,
        }));

        const rawTagOptions = listing.tag_options || [];
        const tagOptionsArray = rawTagOptions.map((item) => ({
          label: item.label,
          value: item.value,
          id: item.id,
        }));

        setTagOptions(tagOptionsArray);
        setBizListing(listing);
        setAction(listing.action);
        setListingImages(listing.images);
        setCategory(get(listing, "categories[0].id") || Categories.BUY);
        setDescription(listing.description);
        setOpenHours(listing.open_hours);
        setPriceRange(listing.price_range);
        setSocialInfo(listing.social_info);
        setDealList(listing.deals);
        setFacilitiesData(listing.facilities_data);
        setLogo(listing.logo);
        setTags(tagArray);
        setReviews(reviewArray);
        setFacilities(rawFacilities);
        setItemList(listingArray);
        setMenuList(menuArray);
        setDealList(dealArray);
        setBizInvoices(bizInvoicesArray);
        setListingRate(listing.rate);
        if (bizInvoicesArray.length > 0) {
          setIsPaid(true);
          setPhoneNumber(rawPhoneNumber);
        } else {
          setPhoneNumber(defaultPhone);
        }
      }
    };

    if (listingSlug) {
      getListingData(listingSlug);
    }
  }, [listingSlug, isViewPage]);

  // TODO: check function upload multiple images
  const handleChangeImages = (srcImages) => setListingImages(srcImages);
  const handleChangeLogo = (srcImages) => setLogo(srcImages);
  const handleSetPriceRange = (priceRange) => setPriceRange(priceRange);
  const handleSetSocialInfo = (socialInfo) => setSocialInfo(socialInfo);
  const handleSetPhoneNumber = (phoneNumber) => setPhoneNumber(phoneNumber);
  const handleSetDescription = (description) => setDescription(description);
  const handleSetFacilities = (facilities) => setFacilitiesData(facilities);
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
    if (isRevision) {
      await BizListingRevision.updateBizListingRevision(bizListing.id, {
        description: description,
        price_range: priceRange,
        action: action,
        images: listingImages,
        social_info: socialInfo,
        phone_number: phoneNumber,
        facilities_data: facilitiesData,
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
        open_hours: openHours,
        tags: tags.map((item) => item.id),
        is_verified: false,
        is_accepted: false,
        logo: logo,
        products: currentItemList.map((item) => item.id) || [],
        menus: currentMenuList.map((item) => item.id) || [],
        deals: currentDealList.map((item) => item.id) || [],
        biz_invoices: bizInvoices.map((item) => item.id) || [],
        reviews: reviews.map((item) => item.id) || [],
        categories: bizListing.categories.map((item) => item.id) || [],
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
          ? item.id.toString()
          : item.parent_id
          ? item.parent_id.toString()
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
          ? item.id.toString()
          : item.parent_id
          ? item.parent_id.toString()
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
          category: get(bizListing, "categories[0].id"),
        };
        await DealApi.createDeal(CreateData);
      })
    );
    await Promise.all(
      editedDealList.map(async (item) => {
        const parent_id = !item.is_revision
          ? item.id.toString()
          : item.parent_id
          ? item.parent_id.toString()
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
          category: get(bizListing, "categories[0].id"),
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

  if (!bizListing) {
    return null;
  }

  return (
    <div className={styles.listing_homepage}>
      <SectionLayout show={screen === ListingHomePageScreens.HOME}>
        <Banner
          isViewPage={isViewPage}
          isPaid={isPaid}
          listingImages={listingImages}
          onChangeImages={handleChangeImages}
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
          userInfo={userInfo}
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
              // onChangeReviewsSequence={handleChangeReviewsSequence}
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
  );
};

export async function getServerSideProps(context) {
  // Pass data to the page via props
  return {
    props: {},
  };
}

export default EditListingHomepage;
