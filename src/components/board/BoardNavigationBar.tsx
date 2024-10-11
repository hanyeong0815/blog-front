import { boardListView } from "@models/board/BoardListView";
import { format } from "date-fns-tz";
import { ko } from "date-fns/locale";
import { FunctionComponent as FC } from "react";
import { FaAnglesRight, FaAnglesLeft } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";

interface BoardNavigationBarProps {
  domain: string | undefined;
  naviSwitch: boolean;
  boardList: boardListView[] | undefined;
  setNaviSwtich: React.Dispatch<React.SetStateAction<boolean>>;
}

const BoardNavigationBar: FC<BoardNavigationBarProps> = ({
  domain,
  naviSwitch,
  boardList,
  setNaviSwtich,
}) => {
  return (
    <>
      {naviSwitch ? (
        <div className="flex flex-col h-screen bg-gray-300">
          <div className="flex p-2 w-full items-end justify-end">
            <FaAnglesLeft
              onClick={() => {
                setNaviSwtich(false);
              }}
              className="cursor-pointer text-2xl"
            />
          </div>
          <div>
            {boardList !== undefined
              ? boardList.map((board, idx) => {
                  return (
                    <Link
                      to={`/${domain}/${board.boardId}`}
                      key={board.boardId}
                      className="flex flex-row justify-between px-2 py-1 items-center"
                    >
                      <p className="text-lg font-bold">{board.title}</p>
                      <p className="text-sm text-gray-400">
                        {format(board.createdAt, "yyyy-MM-dd HH:mm", {
                          locale: ko,
                        })}
                      </p>
                    </Link>
                  );
                })
              : ""}
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-screen bg-gray-300 items-center py-4 border-b border-gray-500">
          <FaAnglesRight
            onClick={() => {
              setNaviSwtich(true);
            }}
            className="cursor-pointer text-2xl"
          />
        </div>
      )}
    </>
  );
};

export default BoardNavigationBar;
