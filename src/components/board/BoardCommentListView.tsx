import { comment } from "@models/board/BoardDetailView";
import BoardReplyViewComponent from "./BoardReplyViewComponent";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { FunctionComponent as FC, useCallback, useRef, useState } from "react";
import useAuth from "@store/auth/useAuth";
import api from "@/api/AxiosInstance";

interface BoardCommentListViewProps {
  commentCount: number;
  comments: comment[];
  commentRef: React.MutableRefObject<HTMLTextAreaElement | null>;
  postComment: () => void;
}

const BoardCommentListView: FC<BoardCommentListViewProps> = (props) => {
  const { commentCount, comments, commentRef, postComment } = props;
  const { isAuthenticated, authUser, setIsUnSignWarningOpen } = useAuth();

  const replyRef = useRef<HTMLTextAreaElement | null>(null);

  const [isCommentPostSwitch, setIsCommentPostSwitch] =
    useState<boolean>(false);
  const [commentSwitch, setCommentSwitch] = useState<string>();
  const [commentContent, setCommentContent] = useState<string>();
  const [replySwitch, setReplySwitch] = useState<string>();

  const updateComment = useCallback(
    (commentId: string | undefined) => {
      if (commentId === undefined || commentContent === "") {
        return;
      }

      const url = "http://localhost:8100/board/comment";
      api
        .patch(url, {
          commentId,
          content: commentContent,
          username: authUser?.username,
        })
        .then(({ data }) => data)
        .then((response: boolean) => {
          if (response) location.reload();
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [commentContent]
  );

  const deleteComment = useCallback(
    (commentId: string | undefined, commentUsername: string | undefined) => {
      if (commentUsername !== authUser?.username) return;

      const url = "http://localhost:8100/board/comment";

      api
        .delete(url, {
          data: {
            commentId,
            username: authUser?.username,
          },
        })
        .then(() => {
          location.reload();
        });
    },
    []
  );

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
    <div className="border-2 flex flex-col gap-1 rounded-md">
      <div className="px-4 py-2 text-xl font-bold text-gray-300">댓글</div>
      <div className="flex flex-col gap-1 bg-[#6279B8] min-h-20 border-t border-black">
        {commentCount ?? 0 > 0 ? (
          comments.map((comment, index) => {
            return (
              <div key={comment.id}>
                {commentSwitch === comment.id ? (
                  <div key={comment.id} className="p-2 mt-2 relative border-t">
                    <textarea
                      ref={replyRef}
                      value={commentContent}
                      onChange={(evt) => {
                        setCommentContent(evt.target.value);
                      }}
                      className="w-full min-h-32 resize-none rounded-lg px-2 py-1 text-gray-200 bg-gray-700 pr-16"
                      spellCheck={false}
                    />
                    <div className="absolute right-4 bottom-6 flex flex-col gap-2">
                      <button
                        onClick={() => {
                          setCommentSwitch("");
                          setCommentContent(comment.content);
                        }}
                        className="border rounded-lg bg-gray-400 text-white p-2"
                      >
                        취소
                      </button>
                      <button
                        onClick={() => {
                          if (commentContent !== comment.content) {
                            updateComment(comment.id);
                          }
                        }}
                        className="border rounded-lg bg-gray-600 text-white p-2"
                      >
                        작성
                      </button>
                    </div>
                  </div>
                ) : (
                  <div key={comment.id} className="flex flex-col gap-1">
                    {!comment.deleted ? (
                      <div className="flex flex-col gap-2 border px-8 py-2 bg-comment-bg">
                        <div className="flex flex-row justify-between">
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
                          {isAuthenticated &&
                            comment.username === authUser?.username && (
                              <div className="flex flex-row gap-3">
                                <button
                                  onClick={() => {
                                    deleteComment(comment.id, comment.username);
                                  }}
                                  className="text-gray-300 underline"
                                >
                                  삭제
                                </button>
                                <button
                                  onClick={() => {
                                    setCommentSwitch(comment.id);
                                    setCommentContent(comment.content);
                                  }}
                                  className="text-gray-300 underline"
                                >
                                  수정
                                </button>
                              </div>
                            )}
                        </div>
                        <div className="flex flex-col">
                          <p className="px-2 whitespace-pre-line">
                            {comment.content}
                          </p>
                          <div className="text-end">
                            {replySwitch === comment.id ? (
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
                                      postReply(comment.id);
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
                                  setReplySwitch(comment.id);
                                }}
                                className="text-gray-400 underline"
                              >
                                답글
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="border px-8 py-7 bg-comment-bg">
                        <p className="font-bold">{comment.content}</p>
                      </div>
                    )}
                    {comment.replies !== undefined &&
                      comment.replies.map((reply, index) => {
                        return (
                          <BoardReplyViewComponent
                            key={reply.id}
                            reply={reply}
                            replySwitch={replySwitch}
                            replyRef={replyRef}
                            setReplySwitch={setReplySwitch}
                          />
                        );
                      })}
                  </div>
                )}
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
