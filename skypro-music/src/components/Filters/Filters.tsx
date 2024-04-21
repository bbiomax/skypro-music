"use client";

import styles from "./Filters.module.css";
import classNames from "classnames";
import FilterItem from "./FilterItem/FilterItem";
import { useState } from "react";

const filters = [
  {
    title: "исполнителю",
    list: ["мияги", "баста"],
  },
  {
    title: "году выпуска",
    list: ["2021", "2024"],
  },
  {
    title: "жанру",
    list: ["Рок", "Хип-хоп"],
  },
];

export default function Filters() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  function handleFilterClick(newFilter: string) {
    setActiveFilter((prev) => (prev === newFilter ? null : newFilter));
  }

  return (
    <div className={classNames(styles.centerblockFilter, styles.filter)}>
      <div className={styles.filterTitle}>Искать по:</div>
      {filters.map((filter) => (
        <FilterItem
          key={filter.title}
          isOpened={activeFilter === filter.title}
          handleFilterClick={handleFilterClick}
          title={filter.title}
          list={filter.list}
        />
      ))}
    </div>
  );
}
