import { HTMLProps } from "react";

type InitProps = HTMLProps<HTMLElement>;
export default InitProps;

export type CommonInputProps = Omit<HTMLProps<HTMLInputElement>, "classID">;

export type CommonDivProps = Omit<HTMLProps<HTMLDivElement>, "classID">;

export type CommonLabelProps = HTMLProps<HTMLLabelElement>;

export type CommonButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
