import { trackType } from "@/types";
import styles from "./FilterItem.module.css";
import classNames from "classnames";
import { order } from "../Filters";
import { useAppSelector } from "@/hooks";

type FilterItemType = {
  title: string;
  value: "author" | "genre" | "order";
  handleFilterClick: (newFilter: string) => void;
  isOpened: boolean;
  tracksData: trackType[];
};

export default function FilterItem({
  handleFilterClick,
  title,
  value,
  isOpened,
  tracksData,
}: FilterItemType) {
  // const optionList = useAppSelector((state) => state.playlist.filterOptions[value])

  const getFilterList = () => {
    if (value !== "order") {
      const arr = new Set(
        tracksData?.map((track: trackType) => track[value]) || []
      );
      return Array.from(arr);
    }

    return order;
  };

  const toggleFilter = (item: string) => {};

  return (
    <>
      <div
        onClick={() => handleFilterClick(title)}
        className={classNames(
          styles.filterButton,
          styles.buttonAuthor,
          styles._btnText,
          {
            [styles.active]: isOpened,
          }
        )}
      >
        {title}
      </div>
      <div className={styles.filterDropdown}>
        {isOpened && (
          <ul className={styles.dropdownList}>
            {getFilterList().map((item, index) => (
              <li
                onClick={() => toggleFilter(item)}
                key={index}
                className={styles.dropdownItem}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
