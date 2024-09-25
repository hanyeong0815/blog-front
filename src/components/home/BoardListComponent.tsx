import { boardListView } from "@models/board/BoardListView";
import PATH from "@utils/routes/PATH";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { FunctionComponent as FC, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

interface BoardListComponentProps {
  domain: string | undefined;
  boardList: boardListView[] | undefined;
}

const BoardListComponent: FC<BoardListComponentProps> = (props) => {
  const { boardList, domain } = props;
  const { BOARD_POST } = PATH;
  const { category, page } = useParams();

  const itemsPerPage = 10;
  const startPage =
    Math.floor((Number(page ?? 1) - 1) / itemsPerPage) * itemsPerPage + 1;

  const [boardNumber, setBoardNumber] = useState<number>(0);
  const [height, setHeight] = useState<number>(0); // height 상태

  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (divRef.current) {
      const width = divRef.current.offsetWidth; // width 가져오기
      setHeight(width); // height를 width로 설정
    }
  }, [divRef.current?.offsetWidth]); // width 변경 시 height 업데이트
  return (
    <div className="flex flex-col gap-1 w-full border rounded-md p-4 bg-main">
      {boardList !== undefined ? (
        boardList.map((board, index) => {
          return (
            <Link to={`/${domain}/${board.boardId}`} key={board.boardId}>
              <div key={board.boardId} className="flex flex-row">
                <div ref={divRef} className={`w-[20%] h-[${height}px]`}></div>
                <div className="flex flex-col gap-2 w-[80%] border-x px-4">
                  <div className="flex flex-row justify-between p-2 border-b border-gray-500">
                    <p className="text-xl font-bold">{board.title}</p>
                    <p className="text-gray-500">
                      {format(board.createdAt, "yyyy-MM-dd HH:mm", {
                        locale: ko,
                      })}
                    </p>
                  </div>
                  <div className="border-b border-gray-200 h-20 p-2">
                    <p className="h-full text-gray-500 text-sm">
                      {board.content}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        <p>게시글이 없습니다.</p>
      )}
    </div>
  );
};

export default BoardListComponent;
