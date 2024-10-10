import { useCallback, useRef, useState, useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "@/api/AxiosInstance";
import Layout from "@components/layout/Layout";
import useAuth from "@store/auth/useAuth";
import CanvasImageButtons from "@styles/button/CanvasImageButton";
import BoardMarkdownViewer from "@components/board/BoardMarkdownViewer";
import boardDetailView from "@models/board/BoardDetailView";

const BoardPostPage = () => {
  const { boardId } = useParams();
  const { authUser } = useAuth();
  const navi = useNavigate();

  const titleRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [board, setBoard] = useState<{ title?: string }>({});
  const [selectImg, setSelectImg] = useState<number>(1);
  const [file, setFile] = useState<any>();

  useLayoutEffect(() => {
    if (boardId === undefined) return;

    const url = `http://localhost:8100/board/update/${boardId}/${authUser?.username}`;

    api
      .get(url)
      .then(({ data }) => data)
      .then((response) => {
        setBoard(response);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [authUser, boardId]);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdownContent(e.target.value);
  };

  const post = useCallback(() => {
    const title = titleRef.current?.value;
    const content = contentRef.current?.value;

    if (title === "" || content === "") return;

    const url = "http://localhost:8100/board";
    const updateBoardId = boardId ?? null;

    const formData = new FormData();

    formData.append(
      "dto",
      new Blob(
        [
          JSON.stringify({
            id: updateBoardId,
            title,
            content,
            username: authUser?.username,
            nickname: authUser?.nickname,
            ogNumber: selectImg,
          }),
        ],
        {
          type: "application/json",
        }
      )
    );
    if (selectImg === 5) {
      formData.append("og", file);
    }

    console.log(formData, selectImg);

    api
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data }) => data)
      .then((response: boardDetailView) => {
        navi(`/${response.domain}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [authUser?.username, authUser?.nickname, boardId, selectImg, file, navi]);

  return (
    <Layout>
      <div className="flex flex-col gap-4 py-4 bg-comment-bg w-full h-full rounded-lg">
        <div className="flex flex-row gap-4 h-full px-6 py-4 bg-board-post-bg border-y">
          <input
            type="text"
            ref={titleRef}
            value={board?.title ?? ""}
            onChange={(e) => setBoard({ title: e.target.value })}
            className="px-2 py-2 w-full bg-gray-300 text-xl"
            spellCheck={false}
          />
        </div>
        <div className="px-6">
          <CanvasImageButtons
            selectImg={selectImg}
            file={file}
            setFile={setFile}
            setSelectImg={setSelectImg}
          />
        </div>
        <div className="flex flex-col gap-8 px-6 py-4 bg-board-post-bg border-y h-full">
          <div className="flex flex-row gap-3">
            <textarea
              ref={contentRef}
              rows={10}
              value={markdownContent}
              onChange={handleTextareaChange}
              placeholder="--- 가로선
# + (1~6) 제목(1~6)
> 인용"
              className="resize-none px-4 py-2 text-xl text-gray-200 bg-gray-700 w-[50%] h-screen leading-relaxed"
              spellCheck={false}
            />
            <BoardMarkdownViewer content={markdownContent} />
          </div>
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
