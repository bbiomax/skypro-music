import Centerblock from "@/components/Centerblock/Centerblock";
import { getPlaylistTracks, getTracksForPlaylist } from "@/api/tracks";

type CategoryProps = {
  params: { id: string };
};

export default async function CategoryPage({ params }: CategoryProps) {
  // const tracksData = await getPlaylistTracks(params.id);
  const tracksData = await getTracksForPlaylist(params.id);
  console.log(tracksData);

  return <Centerblock tracks={tracksData} playlist={tracksData} />;
}
