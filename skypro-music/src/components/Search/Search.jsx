'use client'

import classNames from "classnames";
import styles from "./Search.module.css";
import { useState } from "react";
import { setFilters } from "@/store/features/playlistSlice";
import { useAppDispatch } from "@/hooks";

export function Search() {
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();

  const handleChangeValue = (val) => {
    setValue(val);
    dispatch(setFilters({ searchValue: val }));
  };

  return (
    <div className={classNames(styles.centerblockSearch, styles.search)}>
      <svg className={styles.searchSvg}>
        <use xlinkHref="img/icon/sprite.svg#icon-search" />
      </svg>
      <input
        onChange={(e) => handleChangeValue(e.target.value)}
        className={styles.searchText}
        type="search"
        placeholder="Поиск"
        name="search"
      />
    </div>
  );
}
