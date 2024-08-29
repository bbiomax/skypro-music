"use client";

import classNames from "classnames";
import styles from "./Sidebar.module.css";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useUser } from "@/hooks/useUser";

export default function Sidebar() {
  const { user, logout } = useUser();

  return (
    <div className={classNames(styles.mainSidebar, styles.sidebar)}>
      {user?.email && (
        <div className={styles.sidebarPersonal}>
          <p className={styles.sidebarPersonalName}>{user?.email}</p>
          <div onClick={logout} className={styles.sidebarIcon}>
            <svg>
              <use xlinkHref="img/icon/sprite.svg#logout" />
            </svg>
          </div>
        </div>
      )}
      <div className={styles.sidebarBlock}>
        <div className={styles.sidebarList}>
          <div className={styles.sidebarItem}>
            <Link className={styles.sidebarLink} href="/tracks/category/2">
              <Image
                className={styles.sidebarImg}
                src="/img/playlist01.png"
                alt="day's playlist"
                width={250}
                height={150}
              />
            </Link>
          </div>
          <div className={styles.sidebarItem}>
            <Link className={styles.sidebarLink} href="/tracks/category/3">
              <Image
                className={styles.sidebarImg}
                src="/img/playlist02.png"
                alt="top 100"
                width={250}
                height={150}
              />
            </Link>
          </div>
          <div className={styles.sidebarItem}>
            <Link className={styles.sidebarLink} href="/tracks/category/4">
              <Image
                className={styles.sidebarImg}
                src="/img/playlist03.png"
                alt="indi"
                width={250}
                height={150}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
