import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import Nav from "./Nav";

describe("Компонент навигации", () => {
  it("Должен отрендерить картинку с логотипом", () => {
    render(<Nav />);
    const image = screen.getByAltText("Логотип skypro-music");

    expect(image).toBeInTheDocument();
  });
});
