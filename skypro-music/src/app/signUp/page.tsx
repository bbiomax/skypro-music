"use client";

import Image from "next/image";
import styles from "./SignUp.module.css";
import classNames from "classnames";
import { authSignUp } from "@/api/auth";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signup } from "@/api/signup";
import { useUser } from "@/hooks/useUser";

export default function SignUpPage() {
  const { login }: any = useUser();
  const router = useRouter();
  const [formInput, setFormInput] = useState({
    email: "",
    username: "",
    password: "",
    repeatPassword: "",
  });
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    if (
      !formInput.email.trim() ||
      !formInput.username.trim() ||
      !formInput.password.trim() ||
      !formInput.repeatPassword.trim()
    ) {
      return setError("Заполните все поля");
    }

    if (formInput.password !== formInput.repeatPassword) {
      return setError("Пароли не совпадают");
    }
    await signup(formInput)
      .then((data) => {
        login(data);
        router.push("/signin");
      })
      .catch((error) => {
        setError(error + " Данные в неверном формате");
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
            <a href="/tracks">
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
              name="email"
              placeholder="Почта"
              onChange={handleFormInput}
            />
            <input
              className={styles.modalInput}
              type="text"
              name="username"
              placeholder="Введите имя профиля"
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
