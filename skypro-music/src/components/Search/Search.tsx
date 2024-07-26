"use client";

import classNames from "classnames";
import styles from "./Search.module.css";
import { ChangeEvent, useState } from "react";
import { setFilters } from "@/store/features/playlistSlice";
import { useAppDispatch } from "@/hooks";

export function Search() {
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    dispatch(setFilters({ searchValue: e.target.value }));
  };

  return (
    <div className={classNames(styles.centerblockSearch, styles.search)}>
      <svg className={styles.searchSvg}>
        <use xlinkHref="img/icon/sprite.svg#icon-search" />
      </svg>
      <input
        onChange={handleChangeValue}
        className={styles.searchText}
        type="search"
        placeholder="Поиск"
        name="search"
        value={value}
      />
    </div>
  );
}
