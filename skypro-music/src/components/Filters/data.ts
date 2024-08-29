type FilterType = {
  title: string;
  value: "author" | "genre" | "order";
};

export const filters: FilterType[] = [
  {
    title: "Исполнитель",
    value: "author",
  },
  {
    title: "Жанру",
    value: "genre",
  },
  {
    title: "Году выпуска",
    value: "order",
  },
];

export const order = ["По умолчанию", "Сначала новые", "Сначала старые"];
