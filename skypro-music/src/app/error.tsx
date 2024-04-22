"use client";

import styles from "./error.module.css";
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
    <div className={styles.container}>
      <div className={styles.contentBox}>
        <h2 className={styles.title}>О нет!</h2>
        <p>
          Что то пошло не так. <br />
          Пожалуйста попробуйте снова.
        </p>
        <button className={styles.button} onClick={reset}>Попробовать снова</button>
      </div>
    </div>
  );
}
