import Nav from "@/components/Nav/Nav";
import Centerblock from "@/components/Centerblock/Centerblock";
import Sidebar from "@/components/Sidebar/Sidebar";
import Bar from "@/components/Bar/Bar";
import { getPlaylistTracks } from "@/api/tracks";
import Filters from "@/components/Filters/Filters";

type CategoryProps = {
  params: { id: string };
};

export default async function CategoryPage({ params }: CategoryProps) {
  console.log("params " + params);
  const tracksData = await getPlaylistTracks(params.id);
  console.log("tracksData " + tracksData);

  return <Centerblock tracks={tracksData} playlist={tracksData} />;
}
