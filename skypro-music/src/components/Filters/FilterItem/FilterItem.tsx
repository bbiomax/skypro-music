import styles from "./FilterItem.module.css";
import classNames from "classnames";

type FilterItemType = {
  title: string;
  list: string[];
  handleFilterClick: (newFilter: string) => void;
  isOpened: boolean;
};

export default function FilterItem({
  handleFilterClick,
  title,
  list,
  isOpened,
}: FilterItemType) {
  return (
    <>
      <div
        onClick={() => handleFilterClick(title)}
        className={classNames(
          styles.filterButton,
          styles.buttonAuthor,
          styles._btnText
        )}
      >
        {title}
      </div>
      <div className={styles.filterDropdown}>
        {isOpened && (
          <ul className={styles.dropdownList}>
            {list.map((item) => (
              <li className={styles.dropdownItem} key={item}>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
