import { getTracks } from "./tracks";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        data: [
          {
            _id: "1",
            name: "Test Track",
            author: "Test Author",
            album: "Test Album",
            duration_in_seconds: 180,
            staredUser: [],
          },
        ],
      }),
  })
) as jest.Mock;

describe("getTracks", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Асинхронное получение треков", async () => {
    const tracks = await getTracks();
    expect(Array.isArray(tracks)).toBe(true);
    expect(tracks[0]).toHaveProperty("author");
  });

  test("должен выбрасывать ошибку при неудачном запросе", async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
      })
    );

    await expect(getTracks()).rejects.toThrow("Ошибка при получении данных");
  });
});
