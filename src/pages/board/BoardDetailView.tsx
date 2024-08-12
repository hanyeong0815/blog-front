import boardDetailView, { comment } from "@models/board/BoardDetailView";
import useAuth from "@store/auth/useAuth";
import axios from "axios";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import BoardCommentListView from "@components/board/BoardCommentListView";
import BoardRecommendAreaComponent from "@components/board/BoardRecommendAreaComponent";
import api from "@/api/AxiosInstance";
import BoardLayout from "@components/layout/BoardLayout";

const BoardDetailView = () => {
  const { boardId } = useParams();
  const { authUser, accessToken } = useAuth();

  const [boardDetail, setBoardDetail] = useState<boardDetailView>();

  const commentRef = useRef<HTMLTextAreaElement | null>(null);

  useLayoutEffect(() => {
    const url = `http://localhost:8100/board/${boardId}/${authUser?.username}`;

    const findBoardDetail = async () => {
      axios
        .get(url)
        .then(({ data }) => data)
        .then((board: boardDetailView) => {
          setBoardDetail(board);
        })
        .catch((err) => {
          console.error("\n\n\n\n\n\n", err, "\n\n\n\n\n\n");
        });
    };

    findBoardDetail();
  }, [boardId]);

  const postComment = useCallback(() => {
    const content = commentRef.current?.value;
    if (content === "") {
      return;
    }

    const url = "http://localhost:8100/board/comment";
    const boardId = boardDetail?.boardId;
    const username = authUser?.username;
    const nickname = authUser?.nickname;

    api
      .post(url, { boardId, username, nickname, content })
      .then(({ data }) => data)
      .then((response: comment) => {
        location.reload();
      })
      .catch((err) => {
        console.error("\n\n\n\n\n\n", err, "\n\n\n\n\n\n");
      });
  }, [boardDetail]);

  return (
    <BoardLayout>
      <h1 className="flex flex-row gap-3 items-center rounded-t-lg px-4 py-2 bg-detail-view-bg text-xl font-extrabold border-l-2">
        <span className="bg-box-bg rounded-lg px-2 py-1">
          {boardDetail?.category}
        </span>
        {boardDetail?.title}
      </h1>
      <div className="flex flex-row justify-between px-8 py-1 bg-detail-view-bg border-y border-gray-300 text-gray-700">
        <div>
          <p>{boardDetail?.nickname ?? "테스터"}</p>
        </div>
        <div className="flex flex-row gap-8">
          <p className="px-3">
            조회 수:&nbsp;&nbsp;
            <span className="text-black">{boardDetail?.viewCount}</span>
          </p>
          <p className="px-3">
            작성일:&nbsp;&nbsp;
            <span className="text-black">
              {format(
                boardDetail?.createdAt ?? "2011-11-11T11:11:11.360Z",
                "yyyy-MM-dd HH:mm",
                {
                  locale: ko,
                }
              )}
            </span>
          </p>
        </div>
      </div>
      <div className="bg-detail-view-bg min-h-96 px-6">
        <p className="h-full whitespace-pre-line pt-24">
          {boardDetail?.content}
        </p>
      </div>
      {boardDetail?.category !== "공지" && <BoardRecommendAreaComponent />}
      <BoardCommentListView
        commentCount={boardDetail?.commentCount ?? 0}
        comments={boardDetail?.comments ?? []}
        commentRef={commentRef}
        postComment={postComment}
      />
    </BoardLayout>
  );
};

export default BoardDetailView;
