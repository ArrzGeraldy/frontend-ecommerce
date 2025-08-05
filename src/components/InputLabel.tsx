import { Label } from "@radix-ui/react-label";
import React from "react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

interface InputLabelProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  containerStyle?: string;
}

const InputLabel = ({ label, containerStyle, ...props }: InputLabelProps) => {
  return (
    <div className={cn("grid gap-y-2", containerStyle)}>
      <Label className="text-sm">{label}</Label>
      <Input {...props} />
    </div>
  );
};

export default InputLabel;
