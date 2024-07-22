import Nav from "@/components/Nav/Nav";
import Centerblock, {
  CenterblockType,
} from "@/components/Centerblock/Centerblock";
import Sidebar from "@/components/Sidebar/Sidebar";
import Bar from "@/components/Bar/Bar";
import { PlaylistResponse } from "@/types";
import { getPlaylist } from "@/api/tracks";

type CategoryProps = { params: { id: string } };

export default async function Playlist({ params }: CategoryProps) {
  let tracksData: PlaylistResponse;
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
          <Centerblock
            tracksData={tracksData.items}
            id={params.id as CenterblockType["id"]}
          />
          <Sidebar />
        </main>
        <Bar />
        <footer className="footer" />
      </div>
    </div>
  );
}
