import { useEffect, useState } from "react";

import Button from "components/Button/Button";
import Checkbox from "components/Checkbox/Checkbox";
import Icon from "components/Icon/Icon";
import Input from "components/Input/Input";
import Modal, { ModalProps } from "components/Modal/Modal";
import Radio from "components/Radio/Radio";
import Range from "components/Range/Range";
import Tabs from "components/Tabs/Tabs";
import { Filters } from "./enums";
import styles from "./Filter.module.scss";
import { get, isArray } from "lodash";
import { IOption } from "type";
import ProductTypeApi from "services/product-type";
import ProductBrandApi from "services/product-brand";
import { useRouter } from "next/router";
import useGetCountry from "hooks/useGetCountry";
import { sortOptions } from "constant";

export interface IFilter {
  productTypes: string[];
  productBrands: string[];
  minPrice?: number;
  maxPrice?: number;
  sort?: "asc" | "desc";
  minRating?: number;
  maxRating?: number;
}

const Sort = ({ filter, onFilter }) => (
  <div className="flex flex-col gap-2">
    {sortOptions.map((sort) => (
      <Radio
        key={sort.label}
        label={sort.label}
        value={sort.value}
        checked={filter?.sort === sort.value}
        name="sort"
        onClick={(e) =>
          onFilter({ sort: (e.target as HTMLInputElement).value })
        }
      />
    ))}
  </div>
);

const Rating = ({ setFilter }: any) => <div>Rating</div>;

const PriceRange = ({ filter, onFilter }) => {
  const [rangeValues, setRangeValues] = useState<{
    minPrice: number;
    maxPrice: number;
  }>({
    minPrice: 0,
    maxPrice: 0,
  });

  const country = useGetCountry();

  const handleChangeRange = (value) => {
    onFilter(value);
    setRangeValues(value);
  };

  return (
    <div>
      <div className="flex">
        <div>{`${country.currency} ${rangeValues?.minPrice}`}</div>
        &nbsp;-&nbsp;
        <div>{`${country.currency} ${rangeValues?.maxPrice}`}</div>
      </div>
      <div className="flex flex-start mt-5">
        <Range
          value={{ minPrice: 0, maxPrice: 1000 }}
          min={0}
          max={country.max}
          onChange={handleChangeRange}
        />
      </div>
    </div>
  );
};

const Other = ({
  filter,
  filterKey,
  options = [],
  onFilter,
}: {
  filter?: IFilter;
  filterKey: string;
  options?: IOption[];
  onFilter: (e: { [key: string]: string[] }) => void;
}) => {
  const selectedArray = filter?.[filterKey];
  const [filteredOptions, setFilteredOptions] = useState(options || []);
  const [selectedOptions, setSelectedOptions] =
    useState<string[]>(selectedArray);

  const handleSearchProductTypes = (e) => {
    const searchKey = e.target.value;
    const newProductTypesArray = isArray(options)
      ? options.filter((item) =>
          item.value.toLowerCase().includes(searchKey.toLowerCase())
        )
      : [];

    setFilteredOptions(newProductTypesArray);
  };

  const handleUpdateOptions = (e) => {
    const checkboxValue = e.target.value;
    let newSelectedOptions;

    if (selectedOptions.includes(checkboxValue)) {
      newSelectedOptions = [...selectedOptions].filter(
        (item) => item !== checkboxValue
      );
    } else {
      newSelectedOptions = [...selectedOptions, checkboxValue];
    }

    setSelectedOptions(newSelectedOptions);
    onFilter({ [filterKey]: newSelectedOptions });
  };

  return (
    <>
      <Input
        size="large"
        placeholder="Search"
        prefix={<Icon icon="search" size={25} />}
        onChange={handleSearchProductTypes}
      />
      <div className={styles.option_container}>
        {isArray(options) &&
          filteredOptions.map((opt, index) => (
            <Checkbox
              key={(opt.label as string) + index}
              checked={selectedOptions.includes(opt.value)}
              label={opt.label}
              value={opt.value}
              onChange={handleUpdateOptions}
            />
          ))}
      </div>
    </>
  );
};

export interface FilterProps extends ModalProps {
  finalTabLabel?: string;
  finalTabList?: IOption[];
  otherList?: IOption[];
  filter?: IFilter;
  categoryLink?: string | undefined;
  onSubmitFilter: (e?: IFilter) => void;
}

const Filter = (props: FilterProps) => {
  const {
    visible,
    filter,
    finalTabLabel,
    categoryLink,
    onSubmitFilter,
    onClose,
  } = props;

  const router = useRouter();

  const [localFilter, setLocalFilter] = useState<IFilter | undefined>(filter);
  const [productTypes, setProductTypes] = useState<IOption[]>([]);
  const [productBrands, setProductBrands] = useState<IOption[]>([]);

  useEffect(() => {
    const getProductTypes = async () => {
      const data = await ProductTypeApi.getProductTypeByCategoryLinkSlug(
        categoryLink
      );
      const rawProductTypes = get(data, "data.data") || [];
      const formatProductTypes = rawProductTypes.map((item) => ({
        label: item.attributes.label,
        value: item.attributes.value,
      }));
      setProductTypes(formatProductTypes);
    };

    const getProductBrands = async () => {
      const data = await ProductBrandApi.getProductBrandByProductTypeSlug(
        localFilter?.productTypes
      );
      const rawProductBrands = get(data, "data.data") || [];
      const formatProductBrands = rawProductBrands.map((item) => ({
        label: item.attributes.label,
        value: item.attributes.value,
      }));
      setProductBrands(formatProductBrands);
    };

    getProductTypes();
    getProductBrands();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath, categoryLink, localFilter?.productTypes]);

  const handleFilter = (e) => {
    setLocalFilter?.({ ...localFilter, ...e });
  };

  const tabList = [
    {
      label: "Sort",
      value: Filters.SORT,
      content: <Sort filter={localFilter} onFilter={handleFilter} />,
    },
    {
      label: "Rating",
      value: Filters.RATING,
      content: <Rating filter={localFilter} onFilter={handleFilter} />,
    },
    {
      label: "Price range",
      value: Filters.PRICE_RANGE,
      content: <PriceRange filter={localFilter} onFilter={handleFilter} />,
    },
    {
      label: "Other",
      value: Filters.OTHER,
      content: (
        <Other
          key={"productTypes" + get(productTypes, "length")}
          filter={localFilter}
          filterKey="productTypes"
          options={productTypes}
          onFilter={handleFilter}
        />
      ),
    },
    {
      label: finalTabLabel,
      value: Filters.OTHER_OTHER,
      content: (
        <Other
          key={"productBrands" + get(productBrands, "length")}
          filter={localFilter}
          filterKey="productBrands"
          options={productBrands}
          onFilter={handleFilter}
        />
      ),
    },
  ];

  return (
    <Modal
      width="700px"
      visible={visible}
      onClose={onClose}
      title="Filter & Sort"
    >
      <Tabs tabList={tabList} />
      <div className="flex justify-between p-[10px]">
        <div className={styles.reset_btn}>Reset all</div>
        <Button
          text="Apply"
          className={styles.apply_btn}
          onClick={() => {
            onClose?.();
            onSubmitFilter(localFilter);
          }}
        />
      </div>
    </Modal>
  );
};

export default Filter;
