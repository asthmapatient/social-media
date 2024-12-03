import React from "react";
import { Button, ButtonProps } from "./button";
import { Circles } from "react-loader-spinner";
import { useFormState, useFormStatus } from "react-dom";
interface loadingButtonProps extends ButtonProps {
  //added loading to the button props
  loading: Boolean;
}

// useFormStatus loading  just keeps giving false so using useTransiion() 

const LoadingButton = React.forwardRef<HTMLButtonElement, loadingButtonProps>(
  ({ className, loading, ...props }, ref) => {
    return (
      <Button className={className} {...props}>
        {loading && (
          <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        )}
        {props.children}
      </Button>
    );
  }
);

export default LoadingButton;
