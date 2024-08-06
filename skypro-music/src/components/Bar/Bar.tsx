"use client";

import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import styles from "./Bar.module.css";
import classNames from "classnames";
import ProgressBar from "../ProgressBar/ProgressBar";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  setInitialTracks,
  setNextTrack,
  setPrevTrack,
  toggleIsPlaying,
  toggleShuffle,
} from "@/store/features/playlistSlice";
import { useUser } from "@/hooks/useUser";
import { getValueFromLocalStorage } from "@/lib/getValueFromLS";
import { getTracks, setDislike, setLike } from "@/api/tracks";
import { FormatSeconds } from "@/lib/FormatSeconds";
import Link from "next/link";

export default function Bar() {
  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);

  const audioRef = useRef<null | HTMLAudioElement>(null);

  const dispatch = useAppDispatch();
  const { isShuffle } = useAppSelector((store) => store.playlist);
  const { isPlaying } = useAppSelector((store) => store.playlist);

  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isLoop, setIsLoop] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.5);

  const { user } = useUser();

  const [isLiked, setIsLiked] = useState<any>();
  const token = getValueFromLocalStorage("token");

  const duration = audioRef.current?.duration;

  useEffect(() => {
    setIsLiked(() => {
      const isLikedByUser =
        currentTrack?.isFavorite ||
        currentTrack?.staredUser.find((u) => u._id === user?._id);
      setIsLiked(isLikedByUser);
    });
  }, [currentTrack, user?._id]);

  // have
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const changeVolume = (e: any) => {
    setVolume(e.target.value);
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.pause();
      }
      dispatch(toggleIsPlaying(!isPlaying));
    }
  };

  const toggleRepeat = () => {
    setIsLoop((prev) => !prev);
  };

  useEffect(() => {
    if (audioRef.current) {
      if (!isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      if (isLoop) {
        audioRef.current.loop = true;
      } else {
        audioRef.current.loop = false;
      }
    }
  }, [isLoop]);

  useEffect(() => {
    audioRef.current?.addEventListener("timeupdate", () => {
      setCurrentTime(audioRef.current!.currentTime);
    });
  }, []);

  useEffect(() => {
    if (duration) {
      if (currentTime >= duration) {
        dispatch(setNextTrack());
      }
    }
  }, [currentTime]);

  const handleSeek = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      setCurrentTime(Number(event.target.value));
      audioRef.current.currentTime = Number(event.target.value);
    }
  }, []);

  const handleLikeClick = () => {
    if (currentTrack) {
      isLiked
        ? setDislike(token.access, currentTrack?._id).then(() => {
            getTracks().then((data) => {
              dispatch(setInitialTracks({ initialTracks: data }));
            });
          })
        : setLike(token.access, currentTrack?._id).then(() => {
            getTracks().then((data) => {
              dispatch(setInitialTracks({ initialTracks: data }));
            });
          });
      setIsLiked(!isLiked);
    }
  };

  return (
    <>
      {currentTrack && (
        <div className={styles.bar}>
          <div className={styles.barContent}>
            <audio
              ref={audioRef}
              src={currentTrack.track_file}
              onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
            ></audio>
            <div className={styles.timeLine}>
              {FormatSeconds(currentTime)} / {FormatSeconds(duration)}
            </div>
            <ProgressBar
              max={duration || 0}
              value={currentTime}
              step={0.01}
              onChange={handleSeek}
            />
            <div className={styles.barPlayerBlock}>
              <div className={classNames(styles.barPlayer, styles.player)}>
                <div className={styles.playerControls}>
                  <div
                    onClick={() => dispatch(setPrevTrack())}
                    className={styles.playerBtnPrev}
                  >
                    <svg className={styles.playerBtnPrevSvg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-prev" />
                    </svg>
                  </div>
                  <div
                    onClick={togglePlay}
                    className={classNames(styles.playerBtnPlay, styles.btn)}
                  >
                    <svg className={styles.playerBtnPlaySvg}>
                      <use
                        xlinkHref={`/img/icon/sprite.svg#${
                          isPlaying ? "icon-pause" : "icon-play"
                        }`}
                      />
                    </svg>
                  </div>
                  <div
                    onClick={() => dispatch(setNextTrack())}
                    className={styles.playerBtnNext}
                  >
                    <svg className={styles.playerBtnNextSvg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-next" />
                    </svg>
                  </div>
                  <div
                    onClick={toggleRepeat}
                    className={classNames(
                      styles.playerBtnRepeat,
                      styles.BtnIcon
                    )}
                  >
                    <svg className={styles.playerBtnRepeatSvg}>
                      <use
                        xlinkHref={`/img/icon/sprite.svg#${
                          isLoop ? "icon-repeat-active" : "icon-repeat"
                        }`}
                      />
                    </svg>
                  </div>
                  <div
                    onClick={() => dispatch(toggleShuffle())}
                    className={classNames(
                      styles.playerBtnShuffle,
                      styles.BtnIcon
                    )}
                  >
                    <svg className={styles.playerBtnShuffleSvg}>
                      <use
                        xlinkHref={`/img/icon/sprite.svg#${
                          isShuffle ? "icon-shuffle-active" : "icon-shuffle"
                        }`}
                      />
                    </svg>
                  </div>
                </div>
                <div
                  className={classNames(
                    styles.playerTrackPlay,
                    styles.trackPlay
                  )}
                >
                  <div className={styles.trackPlayContain}>
                    <div className={styles.trackPlayImage}>
                      <svg className={styles.trackPlaySvg}>
                        <use xlinkHref="/img/icon/sprite.svg#icon-note" />
                      </svg>
                    </div>
                    <div className={styles.trackPlayAuthor}>
                      <a className={styles.trackPlayAuthorLink} href="http://">
                        {currentTrack?.name}
                      </a>
                    </div>
                    <div className={styles.trackPlayAlbum}>
                      <a className={styles.trackPlayAlbumLink} href="http://">
                        {currentTrack?.author}
                      </a>
                    </div>
                  </div>
                  <div className={styles.trackPlayLikeDis}>
                    {user?.email ? (
                      <div
                        onClick={handleLikeClick}
                        className={classNames(
                          styles.trackPlayLike,
                          styles.BtnIcon
                        )}
                      >
                        <svg className={styles.trackPlayLikeSvg}>
                          <use
                            xlinkHref={`/img/icon/sprite.svg#${
                              isLiked ? "icon-like-active" : "icon-like"
                            }`}
                          />
                        </svg>
                      </div>
                    ) : (
                      <Link href={"/signin"}>
                        <div
                          className={classNames(
                            styles.trackPlayLike,
                            styles.BtnIcon
                          )}
                        >
                          <svg className={styles.trackPlayLikeSvg}>
                            <use xlinkHref={`/img/icon/sprite.svg#icon-like`} />
                          </svg>
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              <div className={classNames(styles.barVolumeBlock, styles.volume)}>
                <div className={styles.volumeContent}>
                  <div className={styles.volumeImage}>
                    <svg className={styles.volumeSvg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-volume" />
                    </svg>
                  </div>
                  <div
                    className={classNames(styles.volumeProgress, styles._btn)}
                  >
                    <input
                      className={classNames(
                        styles.volumeProgressLine,
                        styles._btn
                      )}
                      type="range"
                      name="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={changeVolume}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
