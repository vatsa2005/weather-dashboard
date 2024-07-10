import { useEffect, useState } from "react";

function useResize() {
  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setHeight((prev) => {
        return window.innerHeight;
      });
      setWidth((prev) => {
        return window.innerWidth;
      });
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  return { w: width, h: height };
}

export default useResize;
