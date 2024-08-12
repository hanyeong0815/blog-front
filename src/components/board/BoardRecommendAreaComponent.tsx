import { useState } from "react";
import { IoStarOutline, IoStarSharp } from "react-icons/io5";

const BoardRecommendAreaComponent = () => {
  const [isRecommend, setIsRecommend] = useState<boolean>(false);

  return (
    <div className="flex bg-detail-view-bg min-h-40 justify-center items-center">
      <button
        onClick={() => {
          setIsRecommend(!isRecommend);
        }}
        className="flex flex-row justify-center items-center gap-3 border px-4 py-6 rounded-lg bg-[#272838] text-white"
      >
        {!isRecommend ? (
          <>
            <IoStarOutline className="text-2xl" />
            추천
          </>
        ) : (
          <>
            <IoStarSharp className="text-2xl text-[#F0F66E]" />
            추천 취소
          </>
        )}
      </button>
    </div>
  );
};

export default BoardRecommendAreaComponent;
