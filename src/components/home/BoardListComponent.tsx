import { boardListView } from "@models/board/BoardListView";
import PATH from "@utils/routes/PATH";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { FunctionComponent as FC, useState } from "react";
import { Link } from "react-router-dom";

interface BoardListComponentProps {
  boardList: boardListView[] | undefined;
}

const BoardListComponent: FC<BoardListComponentProps> = (props) => {
  const { boardList } = props;
  const { BOARD_POST } = PATH;

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
        {boardList !== undefined &&
          boardList.map((board, index) => {
            return (
              <Link to={`/${board.boardId}`} key={board.boardId}>
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
          })}
      </ul>
      <div className="flex flex-col items-center gap-6 px-6 py-2">
        <Link
          to={BOARD_POST}
          className="p-1 w-20 border-2 border-black rounded-sm bg-red-700 font-bold self-end text-center"
        >
          글 작성
        </Link>
        <div>&lt; 1 | 2 | 3 | 4 | 5 &gt;</div>
      </div>
    </div>
  );
};

export default BoardListComponent;
