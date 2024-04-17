import Image from "next/image";
import styles from "./Nav.module.css";
import classNames from "classnames";

export default function Nav() {
  return (
    <>
    <div className={classNames(styles.mainNav, styles.nav)}>
      <div className={classNames(styles.navLogo, styles.logo)}
        <Image
          className="logo__image"
            src="/img/logo.png"
            alt="Логотип skypro-music"
            width={113}
            height={17}
        />
      </div>
      <div className="nav__burger burger">
        <span className="burger__line" />
        <span className="burger__line" />
        <span className="burger__line" />
      </div>
      <div className="nav__menu menu">
        <ul className="menu__list">
          <li className="menu__item">
            <a href="#" className="menu__link">
              Главное
            </a>
          </li>
          <li className="menu__item">
            <a href="#" className="menu__link">
              Мой плейлист
            </a>
          </li>
          <li className="menu__item">
            <a href="../signin.html" className="menu__link">
              Войти
            </a>
          </li>
        </ul>
      </div>
    </div>
    </>
  );
}
