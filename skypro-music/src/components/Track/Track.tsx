import styles from "./Track.module.css";

type TrackType = {
  name: string;
  author: string;
  album: string;
};

export default function Track({ name, author, album }: TrackType) {
  return (
    <div className={styles.playlistItem}>
      <div className={styles.playlistTrack}>
        <div className={styles.trackTitle}>
          <div className={styles.trackTitleImage}>
            <svg className={styles.trackTitleSvg}>
              <use xlinkHref="img/icon/sprite.svg#icon-note" />
            </svg>
          </div>
          <div className={styles.trackTitleText}>
            <a className={styles.trackTitleLink} href="http://">
              {name} <span className={styles.trackTitleSpan} />
            </a>
          </div>
        </div>
        <div className={styles.trackAuthor}>
          <a className={styles.trackAuthorLink} href="http://">
            {author}
          </a>
        </div>
        <div className={styles.trackAlbum}>
          <a className={styles.trackAlbumLink} href="http://">
            {album}
          </a>
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
