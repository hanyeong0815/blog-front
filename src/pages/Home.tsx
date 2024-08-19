import BoardListComponent from "@components/home/BoardListComponent";
import { useLayoutEffect, useState } from "react";
import boardList from "@models/board/BoardListView";
import axios from "axios";
import RecommendListComponent from "@components/common/RecommendListComponent";
import CategoryBarComponent from "@components/home/CategoryBarComponent";
import Layout from "@components/layout/Layout";
import { useParams } from "react-router-dom";

const Home = () => {
  const { category, page } = useParams();

  const [boardList, setBoardList] = useState<boardList>();

  useLayoutEffect(() => {
    const url = `http://localhost:8100/board?page=${Number(page ?? "0")}${
      (category ?? "default") !== "default" ? "&category=" + category : ""
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
  }, [page, category]);

  return (
    <Layout>
      <div className="w-full h-screen bg-base-bg">
        <div className="flex flex-row gap-4 p-4">
          <div className="w-[74%] flex flex-col gap-0">
            <CategoryBarComponent selectedCategory={category ?? "default"} />
            <BoardListComponent
              boardList={boardList?.boardList}
              totalPage={boardList?.totalPage ?? 0}
            />
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
