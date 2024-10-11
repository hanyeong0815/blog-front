import Layout from "@components/layout/Layout";
import { boardListView } from "@models/board/BoardListView";
import axios from "axios";
import { useLayoutEffect, useState } from "react";

const Home = () => {
  const [boardList, setBoardList] = useState<boardListView[]>();

  useLayoutEffect(() => {
    const url = "http://localhost:8100/board/recommend";

    axios
      .get(url)
      .then(({ data }) => data)
      .then((response: boardListView[]) => {
        setBoardList(response);
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <Layout>
      <div className="w-full h-screen bg-base-bg p-4">
        <h1 className="text-3xl text-gray-200 font-bold py-4">추천 게시글</h1>
        <div className="grid grid-cols-2 gap-4 h-[80%] bg-main rounded-md justify-center items-center p-4">
          {boardList !== undefined ? (
            boardList.map((board, index) => {
              return (
                <div
                  key={board.boardId}
                  className="flex flex-row p-4 h-36 border rounded-md"
                >
                  <div className="w-[30%] border-r">
                    <img
                      src={`https://blog-side-project-front.s3.ap-northeast-2.amazonaws.com/${board.ogThumbnailFileName}`}
                      alt="thumbnail"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="w-[70%] flex flex-col pl-2">
                    <p className="text-xl font-bold">{board.title}</p>
                    <p>{board.content}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div>추천 게시글이 없습니다.</div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
