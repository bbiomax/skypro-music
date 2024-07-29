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
  const tracksData = await getPlaylistTracks(params.id);

  return (
    <div className="wrapper">
      <div className="container">
        <main className="main">
          <Nav />
          <Centerblock tracks={tracksData} playlist={tracksData} />
          <Sidebar />
        </main>
        <Bar />
        <footer className="footer" />
      </div>
    </div>
  );
}
