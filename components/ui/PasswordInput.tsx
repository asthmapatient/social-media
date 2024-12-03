import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "./button";
import { Input } from "./input";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
const PasswordInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}

        className="pe-10"
        {...props}
      />
      <button
      type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute  right-4 top-1/2 -translate-y-2 text-muted-foreground"
      >
        {showPassword ? <FaEye /> : <FaEyeSlash />}
      </button>
    </div>
  );
});

export default PasswordInput;
