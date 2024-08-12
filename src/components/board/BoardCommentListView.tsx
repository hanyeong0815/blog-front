import { comment } from "@models/board/BoardDetailView";
import BoardReplyViewComponent from "./BoardReplyViewComponent";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { FunctionComponent as FC, useState } from "react";
import useAuth from "@store/auth/useAuth";

interface BoardCommentListViewProps {
  commentCount: number;
  comments: comment[];
  commentRef: React.MutableRefObject<HTMLTextAreaElement | null>;
  postComment: () => void;
}

const BoardCommentListView: FC<BoardCommentListViewProps> = (props) => {
  const { commentCount, comments, commentRef, postComment } = props;
  const { isAuthenticated, setIsUnSignWarningOpen } = useAuth();

  const [isCommentPostSwitch, setIsCommentPostSwitch] =
    useState<boolean>(false);

  return (
    <div className="border-2 flex flex-col gap-1 rounded-md">
      <div className="px-4 py-2 text-xl font-bold">댓글</div>
      <div className="flex flex-col gap-1 bg-[#6279B8] min-h-20 border-t border-black">
        {commentCount ?? 0 > 0 ? (
          comments.map((comment, index) => {
            return (
              <div key={comment.id} className="flex flex-col gap-1">
                <div className="flex flex-col gap-2 border px-8 py-2 bg-comment-bg">
                  <div className="flex flex-row gap-4 items-center">
                    <p className="font-bold text-lg">
                      {comment.nickname ?? "테스터"}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {comment.createdAt &&
                        format(comment.createdAt, "yyyy-MM-dd HH:mm", {
                          locale: ko,
                        })}
                    </p>
                  </div>
                  <p className="px-2 whitespace-pre-line">{comment.content}</p>
                </div>
                {comment.replies !== undefined &&
                  comment.replies.map((reply, index) => {
                    return (
                      <BoardReplyViewComponent key={reply.id} reply={reply} />
                    );
                  })}
              </div>
            );
          })
        ) : (
          <p className="text-center leading-[80px] text-gray-800 font-bold">
            댓글이 없습니다.
          </p>
        )}
      </div>
      <div className="relative p-2">
        <textarea
          ref={commentRef}
          onFocus={() => {
            if (!isAuthenticated) setIsUnSignWarningOpen(true);
            setIsCommentPostSwitch(true);
          }}
          onChange={(evt) => {
            if (evt.target.value === "") {
              setIsCommentPostSwitch(false);
            } else {
              setIsCommentPostSwitch(true);
            }
          }}
          onBlur={(evt) => {
            if (evt.target.value === "") {
              setIsCommentPostSwitch(false);
            } else {
              setIsCommentPostSwitch(true);
            }
          }}
          className="w-full min-h-32 resize-none rounded-lg px-2 py-1 text-gray-200 bg-gray-700 pr-16"
          spellCheck={false}
        />
        {isCommentPostSwitch && (
          <button
            onClick={postComment}
            className="absolute right-4 bottom-6 p-2 border rounded-lg bg-gray-600 text-white"
          >
            작성
          </button>
        )}
      </div>
    </div>
  );
};

export default BoardCommentListView;
