import { ReactNode, FC } from "react";

type Props = {
  children: ReactNode;
};

export const PrimaryButton: FC<Props> = ({ children }): JSX.Element => {
  return <button className="w-1/6 flex items-center justify-center rounded-md bg-black text-white p-3">{children}</button>;
};
