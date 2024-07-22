"use client";

import styles from "./Filters.module.css";
import classNames from "classnames";
import FilterItem from "./FilterItem/FilterItem";
import { useState } from "react";
import { trackType } from "@/types";

type FilterType = {
  title: string;
    value: "author" | "genre" | "order";
};

const filters: FilterType[] = [
  {
    title: "исполнителю",
    value: "author",
  },
  {
    title: "жанру",
    value: "genre",
  },
  {
    title: "году выпуска",
    value: "order",
  },
];

export const order = ["По умолчанию", "Сначала новые", "Сначала старые"];

export default function Filters({ tracksData }: { tracksData: trackType[] }) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  function handleFilterClick(newFilter: string) {
    setActiveFilter((prev) => (prev === newFilter ? null : newFilter));
  }

  return (
    <div className={classNames(styles.centerblockFilter, styles.filter)}>
      <div className={styles.filterTitle}>Искать по:</div>

      <FilterItem
        isOpened={activeFilter === filters[0].title}
        handleFilterClick={handleFilterClick}
        title={filters[0].title}
        value={filters[0].value}
        tracksData={tracksData}
      />

      <FilterItem
        isOpened={activeFilter === filters[1].title}
        handleFilterClick={handleFilterClick}
        title={filters[1].title}
        value={filters[1].value}
        tracksData={tracksData}
      />

      <FilterItem
        isOpened={activeFilter === filters[2].title}
        handleFilterClick={handleFilterClick}
        title={filters[2].title}
        value={filters[2].value}
        tracksData={tracksData}
      />
    </div>
  );
}
