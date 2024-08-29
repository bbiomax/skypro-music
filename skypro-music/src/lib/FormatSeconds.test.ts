import { FormatSeconds } from "./FormatSeconds";

describe("Функция форматирования времени", () => {
  it("Правильно форматирует число в строку", () => {
    const result = FormatSeconds(6);
    expect(result).toBe("0:06");
  });
  it("Правильно форматирует не корректное значение в строку", () => {
    const result = FormatSeconds(0);
    expect(result).toBe("0:00");
  });
});
