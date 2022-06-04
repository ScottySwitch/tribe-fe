import Badge from "components/Badge/Badge";
import { categories } from "constant";

interface ChooseCategoryProps {
  category?: string;
  setCategory?(e?: string): void;
}

const ChooseCategory = (props: ChooseCategoryProps) => {
  const { category, setCategory } = props;
  return (
    <>
      <div className="flex flex-wrap gap-2">
        {categories.map((cate) => (
          <Badge
            key={cate.value}
            onClick={(e) => setCategory?.(e)}
            value={cate.value}
            selected={cate.value === category}
          >
            {cate.label}
          </Badge>
        ))}
      </div>
      <p className="mb-10">
        For shopping trip. Market, mall, souvenir shop, bookstore, etc
      </p>
    </>
  );
};

export default ChooseCategory;
