import BoardNavigationBar from "@components/board/BoardNavigationBar";
import RecommendListComponent from "@components/common/RecommendListComponent";
import BoardListComponent from "@components/home/BoardListComponent";
import CategoryBarComponent from "@components/home/CategoryBarComponent";
import Layout from "@components/layout/Layout";
import boardDetailView from "@models/board/BoardDetailView";
import boardList from "@models/board/BoardListView";
import useAuth from "@store/auth/useAuth";
import axios from "axios";
import React, { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BoardDetailView from "./board/BoardDetailView";

const BlogHome = () => {
  const { domain, boardId } = useParams();
  const { authUser } = useAuth();

  const [boardList, setBoardList] = useState<boardList>();
  const [naviSwtich, setNaviSwtich] = useState<boolean>(true);
  const [boardDetail, setBoardDetail] = useState<boardDetailView>();

  useLayoutEffect(() => {
    console.log("도메인", domain, " boardId : ", boardId);
    if (boardId !== undefined) {
      const url = `http://localhost:8100/board/${boardId}/${authUser?.username}`;

      axios
        .get(url)
        .then(({ data }) => data)
        .then((board: boardDetailView) => {
          setBoardDetail(board);
          console.log(board);
        })
        .catch((err) => {
          console.error("\n\n\n\n\n\n", err, "\n\n\n\n\n\n");
        });
    } else {
      const url = `http://localhost:8100/board/${domain}?page=0`;

      console.log(url);

      axios
        .get(url)
        .then(({ data }) => data)
        .then((boardListResponse: boardList) => {
          setBoardList(boardListResponse);
          console.log(boardListResponse);
        })
        .catch((err) => {
          console.error("\n\n\n\n\n\n", err, "\n\n\n\n\n\n");
        });
    }
  }, [domain]);

  return (
    <Layout>
      <div className="w-full h-screen flex flex-row bg-base-bg">
        <div className={`h-screen ${naviSwtich ? "w-[20%]" : "w-[5%]"}`}>
          <BoardNavigationBar
            naviSwitch={naviSwtich}
            setNaviSwtich={setNaviSwtich}
          />
        </div>
        <div
          className={`flex flex-row h-screen ${
            naviSwtich ? "w-[80%]" : "w-[95%]"
          }`}
        >
          {boardId !== undefined ? (
            <BoardDetailView />
          ) : (
            <BoardListComponent
              boardList={boardList?.boardList}
              domain={domain}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BlogHome;
