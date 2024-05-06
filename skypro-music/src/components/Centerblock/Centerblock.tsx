import { getTracks } from "@/api/tracks";
import Filters from "../Filters/Filters";
import Track from "../Track/Track";
import styles from "./Centerblock.module.css";
import classNames from "classnames";
import { trackType } from "@/types";
import { useEffect, useState } from "react";
import { error } from "console";

type playlistType = {
  setTrack: (param: trackType) => void;
};

export default function Centerblock({ setTrack }: playlistType) {
  // let tracksData: trackType[];
  // try {
  //   tracksData = await getTracks();
  // } catch (error: any) {
  //   throw new Error(error.message);
  // }

  const [tracksData, setTracksData] = useState<trackType[]>([]);
  useEffect(() => {
    getTracks()
      .then((data: trackType[]) => setTracksData(data))
      .catch((error: any) => {
        throw new Error(error.message);
      });
  }, []);

  return (
    <div className={classNames(styles.mainCenterblock, styles.centerblock)}>
      <div className={classNames(styles.centerblockSearch, styles.search)}>
        <svg className={styles.searchSvg}>
          <use xlinkHref="img/icon/sprite.svg#icon-search" />
        </svg>
        <input
          className={styles.searchText}
          type="search"
          placeholder="Поиск"
          name="search"
        />
      </div>
      <h2 className={styles.centerblockH2}>Треки</h2>
      <Filters />
      <div
        className={classNames(
          styles.centerblockContent,
          styles.playlistContent
        )}
      >
        <div className={classNames(styles.contentTitle, styles.playlistTitle)}>
          <div className={classNames(styles.playlistTitleCol, styles.col1)}>
            Трек
          </div>
          <div className={classNames(styles.playlistTitleCol, styles.col2)}>
            Исполнитель
          </div>
          <div className={classNames(styles.playlistTitleCol, styles.col3)}>
            Альбом
          </div>
          <div className={classNames(styles.playlistTitleCol, styles.col4)}>
            <svg className={styles.playlistTitleSvg}>
              <use xlinkHref="img/icon/sprite.svg#icon-watch" />
            </svg>
          </div>
        </div>
        <div className={classNames(styles.contentPlaylist, styles.playlist)}>
          {tracksData.map((trackData) => (
            <Track
              onClick={() => setTrack(trackData)}
              key={trackData.id}
              name={trackData.name}
              author={trackData.author}
              album={trackData.album}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
