import { FunctionComponent as FC } from "react";
import { FaAnglesRight, FaAnglesLeft } from "react-icons/fa6";

interface BoardNavigationBarProps {
  naviSwitch: boolean;
  setNaviSwtich: React.Dispatch<React.SetStateAction<boolean>>;
}

const BoardNavigationBar: FC<BoardNavigationBarProps> = ({
  naviSwitch,
  setNaviSwtich,
}) => {
  return (
    <>
      {naviSwitch ? (
        <div className="flex flex-col h-screen bg-gray-300">
          <div className="flex p-2 w-full items-end justify-end">
            <FaAnglesLeft
              onClick={() => {
                setNaviSwtich(false);
              }}
              className="cursor-pointer text-2xl"
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-screen bg-gray-300 items-center py-4 border-b border-gray-500">
          <FaAnglesRight
            onClick={() => {
              setNaviSwtich(true);
            }}
            className="cursor-pointer text-2xl"
          />
        </div>
      )}
    </>
  );
};

export default BoardNavigationBar;
