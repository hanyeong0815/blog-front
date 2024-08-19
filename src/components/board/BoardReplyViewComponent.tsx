import api from "@/api/AxiosInstance";
import { reply } from "@models/board/BoardDetailView";
import useAuth from "@store/auth/useAuth";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { FunctionComponent as FC, useCallback } from "react";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";

interface BoardReplyViewComponentProps {
  reply: reply;
  replySwitch: string | undefined;
  replyRef: React.MutableRefObject<HTMLTextAreaElement | null>;
  setReplySwitch: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const BoardReplyViewComponent: FC<BoardReplyViewComponentProps> = (props) => {
  const { reply, replySwitch, replyRef, setReplySwitch } = props;
  const { authUser } = useAuth();

  const postReply = useCallback((targetId: string | undefined) => {
    const content = replyRef.current?.value;
    if (content === "") return;

    const url = "http://localhost:8100/board/reply";

    api
      .post(url, {
        targetId,
        content,
        username: authUser?.username,
        nickname: authUser?.nickname,
      })
      .then(() => {
        location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div key={reply.id} className="flex flex-col gap-1 pl-4">
      <div className="flex flex-row gap-2">
        <MdOutlineSubdirectoryArrowRight />
        <div className="flex flex-col gap-2 border px-8 py-2 bg-comment-bg w-full">
          <div className="flex flex-row gap-4 items-center">
            <p className="font-bold text-lg">{reply.nickname ?? "테스터"}</p>
            <p className="text-gray-400 text-sm">
              {format(
                reply.createdAt ?? "2011-11-11T11:11:11.360Z",
                "yyyy-MM-dd HH:mm",
                {
                  locale: ko,
                }
              )}
            </p>
          </div>
          <div>
            <p className="px-2 whitespace-pre-line">{reply.content}</p>
            <div className="text-end">
              {replySwitch === reply.id ? (
                <div className="p-2 mt-2 relative border-t">
                  <textarea
                    ref={replyRef}
                    className="w-full min-h-32 resize-none rounded-lg px-2 py-1 text-gray-200 bg-gray-700 pr-16"
                    spellCheck={false}
                  />
                  <div className="absolute right-4 bottom-6 flex flex-col gap-2">
                    <button
                      onClick={() => {
                        setReplySwitch("");
                      }}
                      className="border rounded-lg bg-gray-400 text-white p-2"
                    >
                      취소
                    </button>
                    <button
                      onClick={() => {
                        postReply(reply.id);
                      }}
                      className="border rounded-lg bg-gray-600 text-white p-2"
                    >
                      작성
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setReplySwitch(reply.id);
                  }}
                  className="text-gray-400 underline"
                >
                  답글
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {reply.replies !== undefined &&
        reply.replies.map((replies, index) => {
          return (
            <BoardReplyViewComponent
              key={replies.id}
              reply={replies}
              replySwitch={replySwitch}
              replyRef={replyRef}
              setReplySwitch={setReplySwitch}
            />
          );
        })}
    </div>
  );
};

export default BoardReplyViewComponent;
