import api from "@/api/AxiosInstance";
import BoardLayout from "@components/layout/BoardLayout";
import Layout from "@components/layout/Layout";
import { boardUpdateData } from "@models/board/BoardDetailView";
import category from "@models/category/Category";
import useAuth from "@store/auth/useAuth";
import StorageManager from "@utils/common/storage";
import axios from "axios";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BoardPostPage = () => {
  const { boardId } = useParams();
  const { isAuthenticated, authUser, setIsUnSignWarningOpen } = useAuth();

  const categoryUrl = "http://localhost:8100/category";

  const navi = useNavigate();

  const categoryRef = useRef<HTMLSelectElement | null>(null);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  const [categoryList, setCategoryList] = useState<category[]>();
  const [board, setBoard] = useState<boardUpdateData>();

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

  useLayoutEffect(() => {
    if (boardId === undefined) return;

    const url = `http://localhost:8100/board/update/${boardId}/${authUser?.username}`;

    api
      .get(url)
      .then(({ data }) => data)
      .then((response: boardUpdateData) => {
        setBoard(response);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoard((board) => ({
      content: board?.content ?? contentRef.current?.value ?? "",
      category: board?.category ?? categoryRef.current?.value ?? "",
      title: e.target.value,
    }));
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBoard((board) => ({
      content: e.target.value,
      category: board?.category ?? categoryRef.current?.value ?? "",
      title: board?.title ?? titleRef.current?.value ?? "",
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBoard((board) => ({
      content: board?.content ?? contentRef.current?.value ?? "",
      category: e.target.value,
      title: board?.title ?? titleRef.current?.value ?? "",
    }));
  };

  const post = useCallback(() => {
    const category = categoryRef.current?.value;
    const title = titleRef.current?.value;
    const content = contentRef.current?.value;

    if (category === "" || title === "" || content === "") return;

    const url = "http://localhost:8100/board";
    const updateBoardId = boardId ?? null;

    api
      .post(url, {
        id: updateBoardId,
        category,
        title,
        content,
        username: authUser?.username,
        nickname: authUser?.nickname,
      })
      .then(({ data }) => {
        if (data) navi("/home");
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <Layout>
      <div className="flex flex-col gap-4 py-4 bg-comment-bg w-full h-full rounded-lg">
        <div className="flex flex-row gap-4 px-6 py-4 bg-board-post-bg border-y">
          <input
            type="text"
            ref={titleRef}
            value={board?.title ?? ""}
            onChange={handleInputChange}
            className="px-2 py-2 w-full bg-gray-300 text-xl"
            spellCheck={false}
          />
        </div>
        <div className="flex flex-col gap-8 px-6 py-4 bg-board-post-bg border-y h-full">
          <textarea
            ref={contentRef}
            value={board?.content ?? ""}
            onChange={handleTextareaChange}
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
    </Layout>
  );
};

export default BoardPostPage;
