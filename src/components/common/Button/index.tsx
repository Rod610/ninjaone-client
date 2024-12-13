import { FC, ReactNode } from "react";

import { classNames } from "../../../utils/classNames";

type ButtonProps = {
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ variant = "primary", disabled = false, onClick, children, className, ...props }) => {
  const buttonClassNames = classNames(
    "border rounded-md p-2 min-w-20 flex justify-center items-center",
    `bg-${variant}`,
    className
  );

  return (
    <button className={buttonClassNames} onClick={onClick} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;
