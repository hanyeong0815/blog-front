import BoardListComponent from "@components/home/BoardListComponent";
import { useLayoutEffect, useState } from "react";
import boardList from "@models/board/BoardListView";
import axios from "axios";
import RecommendListComponent from "@components/home/RecommendListComponent";
import CategoryBarComponent from "@components/home/CategoryBarComponent";
import Layout from "@components/layout/Layout";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("default");
  const [boardList, setBoardList] = useState<boardList>();
  const [page, setPage] = useState<number>(1);

  useLayoutEffect(() => {
    const url = `http://localhost:8100/board?page=${page}${
      selectedCategory !== "default" && "&category=" + selectedCategory
    }`;

    axios
      .get(url)
      .then(({ data }) => data)
      .then((boardListResponse: boardList) => {
        setBoardList(boardListResponse);
      })
      .catch((err) => {
        console.error("\n\n\n\n\n\n", err, "\n\n\n\n\n\n");
      });
  }, [page, selectedCategory]);

  return (
    <Layout>
      <div className="w-full h-screen bg-base-bg">
        <div className="flex flex-row gap-4 p-4">
          <div className="w-[74%]">
            <div className="flex flex-col">
              <CategoryBarComponent
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                setPage={setPage}
              />
              <BoardListComponent boardList={boardList?.boardList} />
            </div>
          </div>
          <div className="w-[25%]">
            <RecommendListComponent />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
