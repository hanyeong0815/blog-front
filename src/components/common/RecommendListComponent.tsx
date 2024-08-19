import boardList, { boardListView } from "@models/board/BoardListView";
import axios from "axios";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { FunctionComponent as FC, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";

interface RecommendListComponentProps {}

const RecommendListComponent: FC<RecommendListComponentProps> = (props) => {
  // const { boardList } = props;

  const [boardList, setBoardList] = useState<boardList>();

  useLayoutEffect(() => {
    const url = `http://localhost:8100/board?size=5&size=5`;

    axios
      .get(url)
      .then(({ data }) => data)
      .then((boardListResponse: boardList) => {
        setBoardList(boardListResponse);
      })
      .catch((err) => {
        console.error("\n\n\n\n\n\n", err, "\n\n\n\n\n\n");
      });
  }, []);

  return (
    <div className="border rounded-md p-4 bg-main">
      <h1 className="font-bold text-2xl pb-4">추천 게시글</h1>
      <ul>
        {boardList !== undefined &&
          boardList.boardList.map((board, index) => {
            return (
              <Link to={`/board/${board.boardId}`} key={board.boardId}>
                <li className="flex flex-row justify-between items-center p-2 border-y text-lg">
                  <p className="overflow-hidden text-ellipsis whitespace-nowrap text-md w-3/5 items-center justify-start pl-2">
                    {board.title}
                  </p>
                  <p className="border border-white rounded-md p-1 bg-box-bg font-bold text-xs">
                    {format(board.createdAt, "MM.dd HH:mm", {
                      locale: ko,
                    })}
                  </p>
                </li>
              </Link>
            );
          })}
      </ul>
    </div>
  );
};

export default RecommendListComponent;
