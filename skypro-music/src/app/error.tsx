"use client";

import { useEffect } from "react";

type ErrorType = {
  error: string;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorType) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Что-то пошло не так!</h2>
      <button onClick={reset}>Попробовать снова</button>
    </div>
  );
}
