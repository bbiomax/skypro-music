"use client";

import styles from "./Filters.module.css";
import classNames from "classnames";
import FilterItem from "./FilterItem/FilterItem";
import { useState } from "react";
import { useAppSelector } from "@/hooks";
import { filters } from "./data";

export const order = ["По умолчанию", "Сначала новые", "Сначала старые"];

export default function Filters() {
  const selectedAuthors = useAppSelector(
    (store) => store.playlist.filterOptions.author
  );
  const selectedGenres = useAppSelector(
    (store) => store.playlist.filterOptions.genre
  );
  const selectedOrder = useAppSelector(
    (store) => store.playlist.filterOptions.order
  );
  const { author, genre } = useAppSelector(
    (state) => state.playlist.filterOptions
  );

  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  function handleFilterClick(newFilter: string) {
    setActiveFilter((prev) => (prev === newFilter ? null : newFilter));
  }

  return (
    <div className={classNames(styles.centerblockFilter, styles.filter)}>
      <div className={styles.filterTitle}>Искать по:</div>

      <FilterItem
        selected={selectedAuthors}
        isOpened={activeFilter === filters[0].title}
        handleFilterClick={handleFilterClick}
        title={filters[0].title}
        value={filters[0].value}
        optionList={author}
        counter={selectedAuthors.length}
      />

      <FilterItem
        selected={selectedAuthors}
        isOpened={activeFilter === filters[1].title}
        handleFilterClick={handleFilterClick}
        title={filters[1].title}
        value={filters[1].value}
        optionList={genre}
        counter={selectedGenres.length}
      />

      <FilterItem
        selected={selectedOrder}
        isOpened={activeFilter === filters[2].title}
        handleFilterClick={handleFilterClick}
        title={filters[2].title}
        value={filters[2].value}
      />
    </div>
  );
}
