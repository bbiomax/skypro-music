"use client";

import { trackType } from "@/types";
import Filters from "../Filters/Filters";
import Track from "../Track/Track";
import styles from "./Centerblock.module.css";
import classNames from "classnames";
import { Search } from "@components/Search/Search";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getTracks } from "@/api/tracks";
import { setInitialTracks } from "@/store/features/playlistSlice";
import { useEffect, useState } from "react";

export type CenterblockType = {
  title: string;
};

export default function Centerblock({ title }: CenterblockType) {
  const dispatch = useAppDispatch();
  const [tracks, setTracks] = useState<[] | trackType[]>([]);
  const filteredTracks = useAppSelector(
    (state) => state.playlist.filteredTracks
  );

  let tracksData: trackType[];

  useEffect(() => {
    getTracks().then((tracksData) => {
      setTracks(tracksData);
      dispatch(setInitialTracks({ initialTracks: tracksData }));
    });
  }, [dispatch]);

  return (
    <div className={classNames(styles.mainCenterblock, styles.centerblock)}>
      <Search />
      <h2 className={styles.centerblockH2}>{title}</h2>
      <Filters tracksData={tracks} />
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
          {filteredTracks.map((track) => (
            <Track key={track.id} track={track} tracksData={tracksData} />
          ))}
        </div>
      </div>
    </div>
  );
}
