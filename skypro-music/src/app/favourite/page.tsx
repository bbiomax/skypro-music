import Nav from "@/components/Nav/Nav";
import Centerblock, {
  CenterblockType,
} from "@/components/Centerblock/Centerblock";
import Sidebar from "@/components/Sidebar/Sidebar";
import Bar from "@/components/Bar/Bar";
import { PlaylistResponse, trackType } from "@/types";
import { getFavorite } from "@/api/tracks";

export default async function Playlist() {
  let tracksData: trackType[] = [];
  let errorMessage = "";
  try {
    tracksData = await getFavorite("");
  } catch (error: any) {
    errorMessage = error.message;
  }

  return (
    <div className="wrapper">
      <div className="container">
        <main className="main">
          <Nav />
          {tracksData && (
            <Centerblock tracksData={tracksData} title="Мои треки" />
          )}
          <Sidebar />
        </main>
        <Bar />
        <footer className="footer" />
      </div>
    </div>
  );
}
