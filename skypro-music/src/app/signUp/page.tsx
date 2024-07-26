"use client";

import Image from "next/image";
import styles from "./SignUp.module.css";
import classNames from "classnames";
import { authSignUp } from "@/api/auth";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [formInput, setFormInput] = useState({
    username: "",
    repeatPassword: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSignUp = () => {
    if (
      !formInput.username.trim() ||
      !formInput.repeatPassword.trim() ||
      !formInput.password.trim()
    ) {
      return setError("Заполните все поля");
    }
    authSignUp({ ...formInput, email: formInput.username })
      .then(() => {
        router.push("/signIn");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFormInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.containerSignup}>
        <div className={styles.modalBlock}>
          <div className={styles.modalFormLogin}>
            <a href="/">
              <div className={styles.modalLogo}>
                <Image
                  src="/img/logo_modal.png"
                  alt="logo"
                  width={140}
                  height={21}
                />
              </div>
            </a>
            <input
              className={classNames(styles.modalInput, styles.login)}
              type="text"
              name="username"
              placeholder="Почта"
              onChange={handleFormInput}
            />
            <input
              className={classNames(styles.modalInput, styles.passwordFirst)}
              type="password"
              name="password"
              placeholder="Пароль"
              onChange={handleFormInput}
            />
            <input
              className={classNames(styles.modalInput, styles.passwordDouble)}
              type="password"
              name="repeatPassword"
              placeholder="Повторите пароль"
              onChange={handleFormInput}
            />
            <div style={{ color: "red" }}>{error}</div>
            <button onClick={handleSignUp} className={styles.modalBtnSignupEnt}>
              Зарегистрироваться
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
