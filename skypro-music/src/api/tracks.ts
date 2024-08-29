import { trackType, userType } from "@/types";
import { json } from "stream/consumers";

const apiUrl =
  " https://webdev-music-003b5b991590.herokuapp.com/catalog/track/all/";
const apiUrPlaylist =
  " https://webdev-music-003b5b991590.herokuapp.com/catalog/selection/";

export async function getTracks(): Promise<trackType[]> {
  return fetch(apiUrl)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Ошибка при получении данных");
      }

      return res.json();
    })
    .then((res) => {
      return res.data;
    });
}

export async function getPlaylistTracks(id: string) {
  const res = await fetch(apiUrPlaylist + id, { next: { revalidate: 1 } });

  if (!res.ok) {
    throw new Error("Ошибка при получении данных");
  }
  const data = await res.json();
  return data.data.items;
}

export async function getTracksForPlaylist(
  playlistId: string
): Promise<trackType[]> {
  const allTracks = await getTracks();
  const playlistTrackId = await getPlaylistTracks(playlistId);

  const playlistTracks = allTracks.filter((track) =>
    playlistTrackId.includes(track._id)
  );

  return playlistTracks;
}

export async function getFavoritesTracks(token: string) {

  return fetch(
    "https://webdev-music-003b5b991590.herokuapp.com/catalog/track/favorite/all/",
    {
      headers: {
        // API требует обязательного указания заголовка content-type, так апи понимает что мы посылаем ему json строчку в теле запроса
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("Ошибка при получении данных");
      }

      return res.json();
    })
    .then((res) => {
      return res.data;
    });
}

export async function getToken({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const res = await fetch(
    "https://webdev-music-003b5b991590.herokuapp.com/user/token/",
    {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        // API требует обязательного указания заголовка content-type, так апи понимает что мы посылаем ему json строчку в теле запроса
        "content-type": "application/json",
      },
    }
  );
  if (!res.ok) {
    throw new Error("Ошибка при получении данных");
  }
  const data = await res.json();
  return data;
}
//   // Обратите внимание, что функция компонента также является асинхронной
//   export default async function HomePage() {
//     const data = await getData();

//     return <main>/* Некий контент */</main>;
//   }

export async function setLike(token: string, id: number) {
  const res = await fetch(
    ` https://webdev-music-003b5b991590.herokuapp.com/catalog/track/${id}/favorite/`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    throw new Error("Ошибка при получении данных");
  }
  const data = await res.json();
  return data;
}

export async function setDislike(token: string, id: number) {
  const res = await fetch(
    ` https://webdev-music-003b5b991590.herokuapp.com/catalog/track/${id}/favorite/`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    throw new Error("Ошибка при получении данных");
  }
  const data = await res.json();
  return data;
}

export async function getFavoriteTracks(token: string) {
  const res = await fetch(
    "https://webdev-music-003b5b991590.herokuapp.com/catalog/track/favorite/all",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Ошибка при получении данных");
  }

  const data = await res.json();
  return data;
}
