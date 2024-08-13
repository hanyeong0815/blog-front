import { boardListView } from "@models/board/BoardListView";
import PATH from "@utils/routes/PATH";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { FunctionComponent as FC, useState } from "react";
import { Link, useParams } from "react-router-dom";

interface BoardListComponentProps {
  boardList: boardListView[] | undefined;
  totalPage: number;
}

const BoardListComponent: FC<BoardListComponentProps> = (props) => {
  const { boardList, totalPage } = props;
  const { BOARD_POST } = PATH;
  const { category, page } = useParams();

  const itemsPerPage = 10;
  const startPage =
    Math.floor((Number(page ?? 1) - 1) / itemsPerPage) * itemsPerPage + 1;
  const endPage = Math.min(startPage + itemsPerPage - 1, totalPage);

  const getPageNumbers = (): number[] => {
    return Array(endPage - startPage + 1)
      .fill(0)
      .map((_, i) => startPage + i);
  };

  const [boardNumber, setBoardNumber] = useState<number>(0);

  return (
    <div className="flex flex-col gap-4 border rounded-md p-4 bg-main">
      <ul>
        <li className="grid grid-cols-custom text-center pb-2 text-lg font-bold">
          <p>번호</p>
          <p>제목</p>
          <p>작성자</p>
          <p>작성일</p>
          <p>조회수</p>
        </li>
        {boardList !== undefined ? (
          boardList.map((board, index) => {
            return (
              <Link to={`/board/${board.boardId}`} key={board.boardId}>
                <li className="grid grid-cols-custom text-center justify-center items-center py-2 border-y text-lg">
                  <p>{index + 1}</p>
                  <div className="flex felx-col gap-1 w-full items-center justify-start pl-4">
                    <p className="overflow-hidden whitespace-nowrap text-ellipsis">
                      {board.title}
                    </p>
                    <span className="font-bold">[{board.commentCount}]</span>
                  </div>
                  <p>{board.nickname ?? "테스터"}</p>
                  <p>
                    {format(board.createdAt, "yyyy.MM.dd", {
                      locale: ko,
                    })}
                  </p>
                  <p>{board.viewCount}</p>
                </li>
              </Link>
            );
          })
        ) : (
          <p className="w-full py-40 text-2xl text-center font-bold">
            게시글이 없습니다.
          </p>
        )}
      </ul>
      <div className="flex flex-col items-center gap-6 px-6 py-2">
        <Link
          to={`${BOARD_POST}`}
          className="p-1 w-20 border-2 border-black rounded-sm bg-red-700 text-gray-300 font-bold self-end text-center"
        >
          글 작성
        </Link>
        <div className="flex flex-row">
          <p>
            {Number(page ?? "1") / 10 > 1 && (
              <Link to={`/${category ?? "home"}/${startPage - 10}`}>
                &lt;&nbsp;
              </Link>
            )}
          </p>
          {getPageNumbers().map((p, index) => {
            return (
              <Link key={index} to={`/${category ?? "home"}/${p}`}>
                <p>
                  |&nbsp;
                  <span
                    className={`${Number(page ?? 1) === p ? "font-bold" : ""}`}
                  >
                    {p}
                  </span>
                  &nbsp;
                </p>
              </Link>
            );
          })}
          <p>
            |&nbsp;
            {totalPage - endPage > 0 ? (
              <Link to={`/${category ?? "home"}/${endPage + 1}`}>&gt;</Link>
            ) : (
              ""
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BoardListComponent;
