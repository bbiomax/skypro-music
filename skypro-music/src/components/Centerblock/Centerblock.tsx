import { trackType } from "@/types";
import Filters from "../Filters/Filters";
import Track from "../Track/Track";
import styles from "./Centerblock.module.css";
import classNames from "classnames";
import { Search } from "@components/Search/Search";

export type CenterblockType = {
  tracksData: trackType[];
  title: string;
};

export default async function Centerblock({
  tracksData,
  title,
}: CenterblockType) {
  return (
    <div className={classNames(styles.mainCenterblock, styles.centerblock)}>
      <Search />
      <h2 className={styles.centerblockH2}>{title}</h2>
      <Filters tracksData={tracksData} />
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
          {tracksData.map((track) => (
            <Track key={track.id} track={track} tracksData={tracksData} />
          ))}
        </div>
      </div>
    </div>
  );
}
