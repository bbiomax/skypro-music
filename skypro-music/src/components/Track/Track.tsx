"use client";

import { trackType } from "@/types";
import styles from "./Track.module.css";
import { setCurrentTrack } from "@/store/features/playlistSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import classNames from "classnames";

type TrackType = {
  track: trackType;
  tracksData: trackType[];
};

export default function Track({ track, tracksData }: TrackType) {
  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);
  const { name, author, album, id } = track;
  const isPlaying = currentTrack?.id === id;
  const dispatch = useAppDispatch();
  const handleTrackClick = () => {
    dispatch(setCurrentTrack({ track, tracksData }));
  };

  return (
    <div onClick={handleTrackClick} className={styles.playlistItem}>
      <div className={styles.playlistTrack}>
        <div className={styles.trackTitle}>
          <div
            className={classNames(styles.trackTitleImage, {
              [styles.trackTitleImageActive]: isPlaying,
            })}
          >
            <svg className={styles.trackTitleSvg}>
              <use xlinkHref="img/icon/sprite.svg#icon-note" />
            </svg>
          </div>
          <div className={styles.trackTitleText}>
            <span className={styles.trackTitleLink}>
              {name} <span className={styles.trackTitleSpan} />
            </span>
          </div>
        </div>
        <div className={styles.trackAuthor}>
          <span className={styles.trackAuthorLink}>{author}</span>
        </div>
        <div className={styles.trackAlbum}>
          <span className={styles.trackAlbumLink}>{album}</span>
        </div>
        <div className={styles.trackTime}>
          <svg className={styles.trackTimeSvg}>
            <use xlinkHref="img/icon/sprite.svg#icon-like" />
          </svg>
          <span className={styles.trackTimeText}>4:44</span>
        </div>
      </div>
    </div>
  );
}
