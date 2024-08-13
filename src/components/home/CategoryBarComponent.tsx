import category from "@models/category/Category";
import axios from "axios";
import { FunctionComponent as FC, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";

interface CategoryBarComponentProps {
  selectedCategory: string;
}

const CategoryBarComponent: FC<CategoryBarComponentProps> = (props) => {
  const { selectedCategory } = props;

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
      <Link
        to={`/home`}
        className={`rounded-t-md py-2 px-3 ${
          selectedCategory === "default"
            ? "bg-main font-bold border-2"
            : "border text-gray-100"
        }`}
      >
        <button>전체</button>
      </Link>
      {categoryList?.map((category, index) => {
        return (
          <Link
            key={category.id}
            to={`/${category.category}`}
            className={`rounded-t-md py-2 px-3 ${
              (selectedCategory ?? "default") === category.category
                ? "bg-main font-bold border-2"
                : "border text-gray-100"
            }`}
          >
            <button key={category.id}>{category.category}</button>
          </Link>
        );
      })}
    </div>
  );
};

export default CategoryBarComponent;
