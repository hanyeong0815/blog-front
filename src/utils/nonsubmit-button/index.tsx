import { FunctionComponent as FC } from "react";

export interface NonSubmitButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

const NonSubmitButton: FC<NonSubmitButtonProps> = (props) => {
  const { onClick: forwardClickEventHandler, ...restProps } = props;

  const onClick: React.MouseEventHandler<HTMLButtonElement> = (evt) => {
    evt.preventDefault();
    !!forwardClickEventHandler && forwardClickEventHandler(evt);
  };

  return <button {...restProps} onClick={onClick} />;
};

export default NonSubmitButton;
