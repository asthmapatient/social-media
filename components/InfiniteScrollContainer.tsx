import React, { PropsWithChildren } from "react";
import { useInView } from "react-intersection-observer";
interface InfiniteScrollContainer extends PropsWithChildren {
  onBottomReached: () => void;
  className?: string;
}

const InfiniteScrollContainer = ({
  children,
  className,
  onBottomReached,
}: InfiniteScrollContainer) => {
  const { ref } = useInView({
    rootMargin: "200px", // call the function before 200px
    onChange(inView) {
      if (inView) {
        onBottomReached();
      }
    },
  });
  return (
    <div className={className}>
      {children}
      <div ref={ref} />
    </div>
  );
};

export default InfiniteScrollContainer;
