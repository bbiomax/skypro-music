"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./SignIn.module.css";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { signin } from "@/api/signin";
import { useUser } from "@/hooks/useUser";
import { getToken } from "@/api/tracks";
import { userType } from "@/types";

export default function SignInPage() {
  const { login }: any = useUser();
  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    if (!formInput.email.trim() || !formInput.password.trim()) {
      return setError("Заполните все поля");
    }
    let userData: userType;
    try {
      userData = await signin(formInput);
      const tokenData = await getToken(formInput);
      login(userData, tokenData);
    } catch (err) {
      setError("Данные в неверном формате");
    }
  };

  const handleFormInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.containerEnter}>
        <div className={styles.modalBlock}>
          <div className={styles.modalFormLogin}>
            <a href="../">
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
              className={classNames(styles.modalInput, styles.password)}
              type="password"
              name="password"
              placeholder="Пароль"
              onChange={handleFormInput}
            />
            <div style={{ color: "red" }}>{error}</div>
            <button onClick={handleSignIn} className={styles.modalBtnEnter}>
              <a>Войти</a>
            </button>
            <button className={styles.modalBtnSignup}>
              <Link href="/signup">Зарегистрироваться</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
