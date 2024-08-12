import { FunctionComponent as FC } from "react";
import Layout from "./Layout";
import RecommendListComponent from "@components/home/RecommendListComponent";
import BoardSimpleListView from "@components/board/BoardSimpleListView";

interface BoardLayoutProps {
  children: React.ReactNode;
}

const BoardLayout: FC<BoardLayoutProps> = ({ children }) => {
  return (
    <Layout>
      <div className="w-full h-screen bg-base-bg">
        <div className="flex flex-row gap-4 p-4">
          <div className="w-[74%] flex flex-col border rounded-md py-2 px-1 bg-main">
            {children}
          </div>
          <div className="w-[25%] flex flex-col gap-6">
            <RecommendListComponent />
            <BoardSimpleListView />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BoardLayout;
