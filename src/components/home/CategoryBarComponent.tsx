import category from "@models/category/Category";
import axios from "axios";
import { FunctionComponent as FC, useLayoutEffect, useState } from "react";

interface CategoryBarComponentProps {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const CategoryBarComponent: FC<CategoryBarComponentProps> = (props) => {
  const { selectedCategory, setSelectedCategory, setPage } = props;

  const [categoryList, setCategoryList] = useState<category[]>();

  useLayoutEffect(() => {
    const url = "http://localhost:8100/category";
    axios
      .get(url)
      .then(({ data }) => data)
      .then((response: category[]) => {
        setCategoryList(response);
      })
      .catch((err) => {
        console.error("\n\n\n\n\n\n", err, "\n\n\n\n\n\n");
      });
  }, []);

  return (
    <div className="flex gap-1 relative px-2 pt-2 overflow-y-scroll whitespace-nowrap scrollbar-hide items-stretch w-full">
      <button
        onClick={() => {
          setSelectedCategory("default");
          setPage(1);
        }}
        className={`rounded-t-md py-2 px-3 ${
          selectedCategory === "default"
            ? "bg-main font-bold border-2"
            : "border text-gray-100"
        }`}
      >
        전체
      </button>
      {categoryList?.map((category, index) => {
        return (
          <button
            key={category.id}
            onClick={() => {
              setSelectedCategory(category.category);
              setPage(1);
            }}
            className={`rounded-t-md py-2 px-3 ${
              selectedCategory === category.category
                ? "bg-main font-bold border-2"
                : "border text-gray-100"
            }`}
          >
            {category.category}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryBarComponent;
