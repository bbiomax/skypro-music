import { getTracks } from "@/api/tracks";
import Filters from "../Filters/Filters";
import Track from "../Track/Track";
import styles from "./Centerblock.module.css";
import classNames from "classnames";
import { trackType } from "@/types";

export default async function Centerblock() {
  let tracksData: trackType[];
  try {
    tracksData = await getTracks();
  } catch (error: any) {
    throw new Error(error.message);
  }

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
