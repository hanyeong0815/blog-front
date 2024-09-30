import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useCallback, useRef, useState, useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "@/api/AxiosInstance";
import Layout from "@components/layout/Layout";
import useAuth from "@store/auth/useAuth";
import CanvasImageButtons from "@styles/button/CanvasImageButton";

const BoardPostPage = () => {
  const { boardId } = useParams();
  const { authUser } = useAuth();
  const navi = useNavigate();

  const categoryRef = useRef<HTMLSelectElement | null>(null);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [board, setBoard] = useState<{ title?: string }>({});
  const [selectImg, setSelectImg] = useState<number>(1);

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
  }, [authUser?.username, authUser?.nickname, boardId, navi]);

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
# X(1~6) 제목(1~6)
n> 인용"
              className="resize-none px-4 py-2 text-xl text-gray-200 bg-gray-700 w-[50%] h-screen leading-relaxed"
              spellCheck={false}
            />
            <div className="border p-4 bg-white w-[50%] rounded-lg prose prose-xl prose-h1:m-1 prose-h2:m-1 prose-h3:m-1 prose-h4:m-1 prose-h5:m-1 prose-h6:m-1 prose-blockquote:m-1 prose-blockquote:leading-3 prose-hr:m-2 prose-p:m-1 max-w-none">
              <ReactMarkdown
                className="w-full h-full whitespace-pre-line"
                remarkPlugins={[remarkGfm]} // 줄바꿈을 강제하는 플러그인 추가
              >
                {markdownContent}
              </ReactMarkdown>
            </div>
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
