"use client";

import Image from "next/image";
import styles from "./Nav.module.css";
import classNames from "classnames";
import { useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { userType } from "../Sidebar/Sidebar";

export default function Nav() {
  const [isBurgerOpened, setIsBurgerOpened] = useState<boolean>(false);
  const isAuthenticated = useSelector(
    (state: userType) => state.user.isAuthenticated
  );

  return (
    <>
      <div className={classNames(styles.mainNav, styles.nav)}>
        <Link className={classNames(styles.navLogo, styles.logo)} href="/">
          <Image
            className={styles.logoImage}
            src="/img/logo.png"
            alt="Логотип skypro-music"
            width={113}
            height={17}
          />
        </Link>
        <div
          onClick={() => setIsBurgerOpened((prev) => !prev)}
          className={classNames(styles.navBurger, styles.burger)}
        >
          <span className={styles.burgerLine} />
          <span className={styles.burgerLine} />
          <span className={styles.burgerLine} />
        </div>
        {isBurgerOpened && (
          <div className={classNames(styles.navMenu, styles.menu)}>
            <ul className={styles.menuList}>
              <li className={styles.menuItem}>
                <Link href="/" className={styles.menuLink}>
                  Главное
                </Link>
              </li>
              <li className={styles.menuItem}>
                <Link href="/favourite" className={styles.menuLink}>
                  Мой плейлист
                </Link>
              </li>
              <li className={styles.menuItem}>
                {isAuthenticated ? (
                  <Link href="/signIn" className={styles.menuLink}>
                    Выйти
                  </Link>
                ) : (
                  <Link href="/signIn" className={styles.menuLink}>
                    Войти
                  </Link>
                )}
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
