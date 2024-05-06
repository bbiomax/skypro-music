"use client";

import Image from "next/image";
import styles from "./Nav.module.css";
import classNames from "classnames";
import { useState } from "react";

export default function Nav() {
  const [isBurgerOpened, setIsBurgerOpened] = useState<boolean>(false);

  return (
    <>
      <div className={classNames(styles.mainNav, styles.nav)}>
        <div className={classNames(styles.navLogo, styles.logo)}>
          <Image
            className={styles.logoImage}
            src="/img/logo.png"
            alt="Логотип skypro-music"
            width={113}
            height={17}
          />
        </div>
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
                <a href="#" className={styles.menuLink}>
                  Главное
                </a>
              </li>
              <li className={styles.menuItem}>
                <a href="#" className={styles.menuLink}>
                  Мой плейлист
                </a>
              </li>
              <li className={styles.menuItem}>
                <a href="../signin.html" className={styles.menuLink}>
                  Войти
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
