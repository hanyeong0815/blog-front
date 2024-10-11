import boardDetailView, { comment } from "@models/board/BoardDetailView";
import useAuth from "@store/auth/useAuth";
import axios from "axios";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BoardCommentListView from "@components/board/BoardCommentListView";
import BoardRecommendAreaComponent from "@components/board/BoardRecommendAreaComponent";
import api from "@/api/AxiosInstance";
import PATH from "@utils/routes/PATH";
import BoardMarkdownViewer from "@components/board/BoardMarkdownViewer";
import { Helmet } from "react-helmet";

const BoardDetailView = () => {
  const { boardId } = useParams();
  const { isAuthenticated, authUser } = useAuth();
  const { BOARD_POST } = PATH;
  const navi = useNavigate();

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

  const delteBoard = useCallback(() => {
    if (boardDetail?.username !== authUser?.username) return;

    const url = "http://localhost:8100/board";

    api
      .delete(url, { data: { boardId, username: authUser?.username } })
      .then(({ data }) => data)
      .then((reponse: boolean) => {
        if (reponse) {
          navi("/home");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [boardDetail]);

  return (
    <>
      <Helmet>
        <meta property="og:title" content={boardDetail?.title} />
        <meta property="og:description" content={boardDetail?.content} />
        <meta
          property="og:image"
          content={`https://blog-side-project-front.s3.ap-northeast-2.amazonaws.com/${boardDetail?.ogThumbnailFileName}`}
        />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      <div className="w-full">
        <h1 className="flex flex-row gap-3 items-center rounded-t-lg px-4 py-2 bg-detail-view-bg text-xl font-extrabold border-l-2">
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
          {isAuthenticated && authUser?.username === boardDetail?.username && (
            <div className="flex flex-row gap-4 pt-2 justify-end">
              <button onClick={delteBoard} className="text-gray-600 underline">
                삭제
              </button>
              <Link
                to={`${BOARD_POST}/${boardDetail?.boardId}`}
                className="text-gray-600 underline"
              >
                수정
              </Link>
            </div>
          )}
          <BoardMarkdownViewer
            content={boardDetail?.content ?? ""}
            className="w-full h-full"
          />
        </div>
        <BoardRecommendAreaComponent boardId={boardId} />
        <BoardCommentListView
          commentCount={boardDetail?.commentCount ?? 0}
          comments={boardDetail?.comments ?? []}
          commentRef={commentRef}
          postComment={postComment}
        />
      </div>
    </>
  );
};

export default BoardDetailView;
