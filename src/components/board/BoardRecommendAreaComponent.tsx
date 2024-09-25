import api from "@/api/AxiosInstance";
import useAuth from "@store/auth/useAuth";
import axios from "axios";
import {
  FunctionComponent as FC,
  useCallback,
  useEffect,
  useState,
} from "react";
import { IoStarOutline, IoStarSharp } from "react-icons/io5";

interface BoardRecommendAreaComponentProps {
  boardId: string | undefined;
}

const BoardRecommendAreaComponent: FC<BoardRecommendAreaComponentProps> = ({
  boardId,
}) => {
  const { isAuthenticated, authUser, setIsUnSignWarningOpen } = useAuth();

  const [isRecommend, setIsRecommend] = useState<boolean>(false);

  useEffect(() => {
    if (!isAuthenticated) return;

    const url = `http://localhost:8100/board/favorite/${boardId}/${authUser?.username}`;

    axios
      .get(url)
      .then(({ data }) => data)
      .then((response: boolean) => {
        setIsRecommend(response);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const favoriteInsertOrDelete = useCallback(() => {
    if (!isAuthenticated) return;

    const url = "http://localhost:8100/board/favorite";

    api
      .post(url, {
        boardId,
        username: authUser?.username,
      })
      .then(({ data }) => data)
      .then((response: boolean) => {
        setIsRecommend(response);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="flex bg-detail-view-bg min-h-40 justify-center items-center">
      <button
        onClick={() => {
          if (!isAuthenticated) {
            setIsUnSignWarningOpen(true);
            return;
          }
          favoriteInsertOrDelete();
          setIsRecommend(!isRecommend);
        }}
        className="flex flex-row justify-center items-center gap-3 border px-4 py-6 rounded-lg bg-[#272838] text-white"
      >
        {!isRecommend ? (
          <>
            <IoStarOutline className="text-2xl" />
            추천
          </>
        ) : (
          <>
            <IoStarSharp className="text-2xl text-[#F0F66E]" />
            추천 취소
          </>
        )}
      </button>
    </div>
  );
};

export default BoardRecommendAreaComponent;
