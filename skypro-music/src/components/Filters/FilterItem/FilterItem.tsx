import { trackType } from "@/types";
import styles from "./FilterItem.module.css";
import classNames from "classnames";
import { order } from "../Filters";
import { useAppSelector } from "@/hooks";
import { useDispatch } from "react-redux";
import { setFilters } from "@/store/features/playlistSlice";

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
  const authorList = useAppSelector(
    (state) => state.playlist.filterOptions.author
  );
  const genreList = useAppSelector(
    (state) => state.playlist.filterOptions.genre
  );
  const dispatch = useDispatch();

  const getFilterList = () => {
    if (value !== "order") {
      const arr = new Set(
        tracksData?.map((track: trackType) => track[value]) || []
      );
      return Array.from(arr);
    }

    return order;
  };

  const filterList: { author: string[]; genre: string[] } = {
    author: authorList,
    genre: genreList,
  };

  const toggleFilter = (
    item: string,
    filterName: "author" | "genre" | "order"
  ) => {
    dispatch(
      setFilters({
        ...(filterName === "author" && {
          author: authorList.includes(item)
            ? authorList.filter((el) => el !== item)
            : [...authorList, item],
        }),

        ...(filterName === "genre" && {
          genre: genreList.includes(item)
            ? genreList.filter((el) => el !== item)
            : [...genreList, item],
        }),

        ...(filterName === "order" && {
          order: item,
        }),
      })
    );
  };

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
                onClick={() => toggleFilter(item, value)}
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
