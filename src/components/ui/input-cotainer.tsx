import { ReactNode } from "react";
import { Label } from "./label";

const InputContainer = ({
  children,
  label,
  error,
  id,
  hideLabel,
}: {
  children: ReactNode;
  label?: string;
  error?: string;
  id: string;
  hideLabel?: boolean;
}) => {
  return (
    <div className="mb-5">
      {!hideLabel && <Label htmlFor={id}>{label}</Label>}
      {children}
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default InputContainer;
