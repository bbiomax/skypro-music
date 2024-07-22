const apiUrl = "https://skypro-music-api.skyeng.tech";

export async function getTracks() {
  const res = await fetch(apiUrl + "/catalog/track/all/");

  if (!res.ok) {
    throw new Error("Ошибка при получении данных");
  }

  return res.json();
}

export async function getPlaylist(id: string) {
  const res = await fetch(apiUrl + `/catalog/selection/${id}`);

  if (!res.ok) {
    throw new Error("Ошибка при получении данных");
  }

  return res.json();
}
