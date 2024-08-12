import ReactDOM from "react-dom";
import React from "react";

type ModalInerfaceFun = (arg: {
  isOpen: boolean;
  children?: React.ReactNode;
}) => JSX.Element;

const ModalPortalInterface: ModalInerfaceFun = ({ isOpen, children }) => {
  if (!isOpen) return <></>;

  return ReactDOM.createPortal(children, document.getElementById("modal")!);
};

export default ModalPortalInterface;
