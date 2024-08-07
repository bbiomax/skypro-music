"use client";

import { trackType } from "@/types";
import styles from "./Track.module.css";
import {
  setCurrentTrack,
  toggleIsPlaying,
} from "@/store/features/playlistSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useUser } from "@/hooks/useUser";
import { getValueFromLocalStorage } from "@/lib/getValueFromLS";
import { useEffect, useRef, useState } from "react";
import { getFavoriteTracks, setDislike, setLike } from "@/api/tracks";
import { FormatSeconds } from "@/lib/FormatSeconds";
import Link from "next/link";

type TrackType = {
  track: trackType;
  tracksData: trackType[];
  isFavorite?: boolean;
};

export default function Track({ track, tracksData, isFavorite }: TrackType) {
  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);
  const { name, author, album, duration_in_seconds, _id: id } = track;
  const { isPlaying } = useAppSelector((store) => store.playlist);
  const { user } = useUser();
  const token = getValueFromLocalStorage("token");
  const isLikedByUser =
    isFavorite || track.staredUser.find((u) => u === user?._id);
  const dispatch = useAppDispatch();
  const [isLiked, setIsLiked] = useState(!!isLikedByUser);
  const [favoriteTracksIds, setFavoriteTracksIds] = useState<number[]>([]);
  const hasFetchedRef = useRef(false);

  const handleTrackClick = () => {
    dispatch(setCurrentTrack({ track: { ...track, isFavorite }, tracksData }));
    dispatch(toggleIsPlaying(true));
  };

  const handleLikeClick = async (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();

    try {
      if (isLiked) {
        await setDislike(token.access, id);
        setFavoriteTracksIds((prev) =>
          prev.filter((trackId) => trackId !== id)
        );
      } else {
        await setLike(token.access, id);
        setFavoriteTracksIds((prev) => [...prev, id]);
      }

      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Ошибка при изменении состояния лайка:", error);
    }
  };

  // useEffect(() => {
  //   const fetchFavoriteTracks = async () => {
  //     if (!token || hasFetchedRef.current) return;
  //     if (!user?.email) return;

  //     hasFetchedRef.current = true;
  //     try {
  //       const favoriteTracks = await getFavoriteTracks(token.access);
  //       setFavoriteTracksIds(
  //         favoriteTracks.data.map((track: any) => track._id)
  //       );
  //     } catch (error) {
  //       console.error("Ошибка загрузки любимых треков:", error);
  //     }
  //   };

  //   fetchFavoriteTracks();
  // }, [token]);

  // useEffect(() => {
  //   const isLikedByUser = favoriteTracksIds.includes(id);
  //   setIsLiked(!!isLikedByUser);
  // }, [favoriteTracksIds, id]);

  return (
    <div onClick={handleTrackClick} className={styles.playlistItem}>
      <div className={styles.playlistTrack}>
        <div className={styles.trackTitle}>
          <div className={styles.trackTitleImage}>
            {currentTrack?._id === track._id && (
              <div
                className={`${
                  isPlaying ? styles.playingDot : styles.stoppedDot
                }`}
              ></div>
            )}
            <svg className={styles.trackTitleSvg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-note" />
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
        {user?.email ? (
          <div onClick={handleLikeClick}>
            <svg className={styles.trackTimeSvg}>
              <use
                xlinkHref={`/img/icon/sprite.svg#${
                  isLiked ? "icon-like-active" : "icon-like"
                }`}
              />
            </svg>
          </div>
        ) : (
          <Link href={"/signin"}>
            <div onClick={(e) => e.stopPropagation()}>
              <svg className={styles.trackTimeSvg}>
                <use
                  xlinkHref={`/img/icon/sprite.svg#icon-like`}
                />
              </svg>
            </div>
          </Link>
        )}
        <div className={styles.trackTime}>
          <span className={styles.trackTimeText}>
            {FormatSeconds(duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}
