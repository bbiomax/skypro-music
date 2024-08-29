"use client";

import Image from "next/image";
import styles from "./Nav.module.css";
import classNames from "classnames";
import { useState } from "react";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";

export default function Nav() {
  const [isBurgerOpened, setIsBurgerOpened] = useState<boolean>(false);
  const { user, logout } = useUser();

  return (
    <>
      <div className={classNames(styles.mainNav, styles.nav)}>
        <Link
          className={classNames(styles.navLogo, styles.logo)}
          href="/tracks"
        >
          <Image
            className={styles.logoImage}
            src="/img/logo.png"
            alt="Логотип skypro-music"
            fetchPriority="high"
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
                <Link href="/tracks" className={styles.menuLink}>
                  Главное
                </Link>
              </li>
              {user?.email && (
                <li className={styles.menuItem}>
                  <Link href="/tracks/favorites" className={styles.menuLink}>
                    Мой плейлист
                  </Link>
                </li>
              )}
              <li className={styles.menuItem}>
                {!user?.email ? (
                  <Link href="/signin" className={styles.menuLink}>
                    Войти
                  </Link>
                ) : (
                  <li className={styles.menuItem} onClick={logout}>
                    Выйти
                  </li>
                )}
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
