"use client";

import { trackType } from "@/types";
import Track from "../Track/Track";
import styles from "./Centerblock.module.css";
import classNames from "classnames";

export default function Centerblock({
  tracks,
  playlist,
  isLoading,
  isFavorite,
}: {
  tracks: trackType[];
  playlist: trackType[];
  isLoading?: boolean;
  isFavorite?: boolean;
}) {

  // console.log("tracks in centerblock " + tracks);

  return (
    <div
      className={classNames(styles.centerblockContent, styles.playlistContent)}
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
        {isLoading ? "Загрузка..." : tracks?.length === 0 ? "Нет треков" : ""}
        {tracks?.map((track) => (
          <Track
            key={track._id}
            track={track}
            tracksData={playlist}
            isFavorite={isFavorite}
          />
        ))}
      </div>
    </div>
  );
}
