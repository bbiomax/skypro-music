import Nav from "@/components/Nav/Nav";
import Centerblock, {
  CenterblockType,
} from "@/components/Centerblock/Centerblock";
import Sidebar from "@/components/Sidebar/Sidebar";
import Bar from "@/components/Bar/Bar";
import { PlaylistResponse } from "@/types";
import { getPlaylist } from "@/api/tracks";

type CategoryProps = { params: { id: string } };

const playlistTitles = {
  "1": "Плейлист дня",
  "2": "100 танцевальных хитов",
  "3": "Инди-заряд",
};

type PlaylistType = "1" | "2" | "3";

export default async function Playlist({ params }: CategoryProps) {
  let tracksData: PlaylistResponse;
  const playlistTitle = params.id
    ? playlistTitles[params.id as PlaylistType]
    : "Треки";

  try {
    tracksData = await getPlaylist(params.id);
  } catch (error: any) {
    throw new Error(error.message);
  }

  return (
    <div className="wrapper">
      <div className="container">
        <main className="main">
          <Nav />
          <Centerblock tracksData={tracksData.items} title={playlistTitle} />
          <Sidebar />
        </main>
        <Bar />
        <footer className="footer" />
      </div>
    </div>
  );
}
