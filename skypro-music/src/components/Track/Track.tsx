"use client";

import { trackType } from "@/types";
import styles from "./Track.module.css";
import {
  setCurrentTrack,
  toggleIsPlaying,
} from "@/store/features/playlistSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import classNames from "classnames";
import { useUser } from "@/hooks/useUser";
import { getValueFromLocalStorage } from "@/lib/getValueFromLS";
import { useEffect, useState } from "react";
import { setDislike, setLike } from "@/api/tracks";
import { FormatSeconds } from "@/lib/FormatSeconds";

type TrackType = {
  track: trackType;
  tracksData: trackType[];
  isFavorite?: boolean;
};

export default function Track({ track, tracksData, isFavorite }: TrackType) {
  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);
  const { name, author, album, duration_in_seconds, id } = track;
  // const isPlaying = currentTrack?.id === id;
  const { isPlaying } = useAppSelector((store) => store.playlist);
  const { user } = useUser();
  const token = getValueFromLocalStorage("token");
  const isLikedByUser =
    isFavorite || track.stared_user.find((u) => u.id === user?.id);
  const dispatch = useAppDispatch();
  const [isLiked, setIsLiked] = useState(!!isLikedByUser);
  const handleTrackClick = () => {
    dispatch(setCurrentTrack({ track: { ...track, isFavorite }, tracksData }));
    dispatch(toggleIsPlaying(true));
  };

  const handleLikeClick = () => {
    isLiked ? setDislike(token.access, id) : setLike(token.access, id);
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    const isLikedByUser =
      isFavorite || track.stared_user.find((u) => u.id === user?.id);
    // console.log(isLikedByUser);
    setIsLiked(!!isLikedByUser);
  }, [track]);

  return (
    <div onClick={handleTrackClick} className={styles.playlistItem}>
      <div className={styles.playlistTrack}>
        <div className={styles.trackTitle}>
          <div className={styles.trackTitleImage}>
            {currentTrack?.id === track.id && (
              <div
                className={`${
                  isPlaying ? styles.playingDot : styles.stoppedDot
                }`}
              ></div>
            )}
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
        <div onClick={handleTrackClick} className={styles.trackAuthor}>
          <span className={styles.trackAuthorLink}>{author}</span>
        </div>
        <div onClick={handleTrackClick} className={styles.trackAlbum}>
          <span className={styles.trackAlbumLink}>{album}</span>
        </div>
        <div onClick={handleLikeClick}>
          <svg className={styles.trackTimeSvg}>
            <use
              xlinkHref={`/img/icon/sprite.svg#${
                isLiked ? "icon-like-active" : "icon-like"
              }`}
            />
          </svg>
        </div>
        <div className={styles.trackTime}>
          <span className={styles.trackTimeText}>
            {FormatSeconds(duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}
