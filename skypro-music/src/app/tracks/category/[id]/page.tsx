import Centerblock from "@/components/Centerblock/Centerblock";
import { getPlaylistTracks } from "@/api/tracks";

type CategoryProps = {
  params: { id: string };
};

export default async function CategoryPage({ params }: CategoryProps) {
  console.log("params " + params);
  const tracksData = await getPlaylistTracks(params.id);
  console.log("tracksData " + tracksData);

  return <Centerblock tracks={tracksData} playlist={tracksData} />;
}
