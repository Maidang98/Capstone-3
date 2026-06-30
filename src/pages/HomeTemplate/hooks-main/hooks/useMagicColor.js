import { useEffect, useState } from "react";

export const useMagicColor = () => {
  const [color, setColor] = useState("#ff0000");

  useEffect(() => {
    const interval = setInterval(() => {
      const randomColor = Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");

      setColor(`#${randomColor}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return color;
};