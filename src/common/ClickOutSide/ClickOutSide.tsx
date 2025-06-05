import { useEffect, useRef } from "react";

interface ClickOutSideProps {
  children: React.ReactNode;
  exceptionRef?: React.RefObject<HTMLElement>;
  onclick: () => void;
  className?: string;
}

const ClickOutSide: React.FC<ClickOutSideProps> = ({
  children,
  exceptionRef,
  onclick,
  className,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickListener = (event: MouseEvent) => {
      let clickedInside: null | boolean = null;

      if (exceptionRef) {
        clickedInside =
          (wrapperRef.current &&
            wrapperRef.current.contains(event.target as Node)) ||
          (exceptionRef.current && exceptionRef.current === event.target) ||
          (exceptionRef.current &&
            exceptionRef.current.contains(event.target as Node));
      } else {
        clickedInside =
          wrapperRef.current &&
          wrapperRef.current.contains(event.target as Node);
      }
      if (!clickedInside) onclick();
    };
    document.addEventListener("click", handleClickListener);

    return () => {
      document.removeEventListener("click", handleClickListener);
    };
  }, [exceptionRef, onclick]);

  return (
    <div
      ref={wrapperRef}
      className={`${className} || ''`}
    >
      {children}
    </div>
  );
};

export default ClickOutSide;
