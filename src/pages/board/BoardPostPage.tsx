import api from "@/api/AxiosInstance";
import BoardLayout from "@components/layout/BoardLayout";
import category from "@models/category/Category";
import useAuth from "@store/auth/useAuth";
import axios from "axios";
import {
  FunctionComponent as FC,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

interface BoardPostPageProps {}

const BoardPostPage: FC<BoardPostPageProps> = (props) => {
  const {} = props;
  const { isAuthenticated, authUser, setIsUnSignWarningOpen } = useAuth();

  const categoryUrl = "http://localhost:8100/category";

  const navi = useNavigate();

  const categoryRef = useRef<HTMLSelectElement | null>(null);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  const [categoryList, setCategoryList] = useState<category[]>();

  useLayoutEffect(() => {
    if (!isAuthenticated) {
      setIsUnSignWarningOpen(true);
    }

    axios
      .get(categoryUrl)
      .then(({ data }) => data)
      .then((reponse: category[]) => {
        setCategoryList(reponse);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const post = useCallback(() => {
    const category = categoryRef.current?.value;
    const title = titleRef.current?.value;
    const content = contentRef.current?.value;

    if (category === "" || title === "" || content === "") return;

    const url = "http://localhost:8100/board";

    api
      .post(url, {
        category,
        title,
        content,
        username: authUser?.username,
        nickname: authUser?.nickname,
      })
      .then(({ data }) => {
        if (data) navi("/");
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <BoardLayout>
      <div className="flex flex-col gap-4 py-4 bg-comment-bg w-full h-full rounded-lg">
        <div className="flex flex-row gap-4 px-6 py-4 bg-board-post-bg border-y">
          <select
            ref={categoryRef}
            className="px-4 py-2 appearance-none text-center font-bold bg-gray-300"
          >
            <option value="">카테고리</option>
            {categoryList?.map((category, index) => {
              return (
                <option key={category.id} value={category.category}>
                  {category.category}
                </option>
              );
            })}
          </select>
          <input
            type="text"
            ref={titleRef}
            className="px-2 py-2 w-full bg-gray-300 text-xl"
            spellCheck={false}
          />
        </div>
        <div className="flex flex-col gap-8 px-6 py-4 bg-board-post-bg border-y h-full">
          <textarea
            ref={contentRef}
            className="resize-none px-2 py-1 text-xl text-gray-200 bg-gray-700 w-full h-full"
            spellCheck={false}
          ></textarea>
          <button
            onClick={post}
            className="p-4 border rounded-lg text-2xl font-bold bg-[#BB4430]"
          >
            작성하기
          </button>
        </div>
      </div>
    </BoardLayout>
  );
};

export default BoardPostPage;
