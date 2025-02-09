import { ReactNode } from "react";
import { Label } from "./label";

const InputContainer = ({
  children,
  label,
  error,
  id,
}: {
  children: ReactNode;
  label: string;
  error?: string;
  id: string;
}) => {
  return (
    <div className="mb-5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default InputContainer;
