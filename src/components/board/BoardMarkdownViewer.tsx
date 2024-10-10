import { CommonDivProps } from "@models/common/props";
import { FunctionComponent as FC } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface BoardMarkdownViewerProps extends CommonDivProps {
  content: string;
}

const BoardMarkdownViewer: FC<BoardMarkdownViewerProps> = ({
  content,
  className,
}) => {
  return (
    <div
      className={`border p-4 bg-white w-[50%] rounded-lg prose prose-xl prose-h1:m-1 prose-h2:m-1 prose-h3:m-1 prose-h4:m-1 prose-h5:m-1 prose-h6:m-1 prose-blockquote:m-1 prose-blockquote:leading-3 prose-hr:m-2 prose-p:m-1 max-w-none ${className}`}
    >
      <ReactMarkdown
        className="w-full h-full min-h-96 whitespace-pre-line"
        remarkPlugins={[remarkGfm]} // 줄바꿈을 강제하는 플러그인 추가
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default BoardMarkdownViewer;
