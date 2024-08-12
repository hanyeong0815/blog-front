import ModalPortalInterface from "@components/modal/ModalPortalInterface";
import { CommonDivProps } from "@models/common/props";
import { FunctionComponent as FC } from "react";

export interface ModalProps extends CommonDivProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: FC<ModalProps> = (props) => {
  const { isOpen, setIsOpen, children, className, ...restProp } = props;

  return (
    <ModalPortalInterface isOpen={isOpen}>
      <div className="min-h-screen min-w-full flex justify-center fixed left-0 top-0">
        <div
          onClick={() => {
            setIsOpen(false);
          }}
          className="w-full h-full absolute bg-black opacity-50"
        ></div>
        <div
          {...restProp}
          className={`items-center m-24 w-full min-h-full relative overflow-scroll border-8 rounded-xl shadow-md p-8 bg-light ${className}`}
        >
          {children}
        </div>
      </div>
    </ModalPortalInterface>
  );
};

export default Modal;
