import { reply } from "@models/board/BoardDetailView";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { FunctionComponent as FC } from "react";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";

interface BoardReplyViewComponentProps {
  reply: reply;
}

const BoardReplyViewComponent: FC<BoardReplyViewComponentProps> = (props) => {
  const { reply } = props;

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
          <p className="px-2 whitespace-pre-line">{reply.content}</p>
        </div>
      </div>
      {reply.replies !== undefined &&
        reply.replies.map((replies, index) => {
          return <BoardReplyViewComponent key={replies.id} reply={replies} />;
        })}
    </div>
  );
};

export default BoardReplyViewComponent;
