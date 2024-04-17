import Track from "../Track/Track";

export default function Centerblock() {
  return (
    <div className="main__centerblock centerblock">
      <div className="centerblock__search search">
        <svg className="search__svg">
          <use xlinkHref="img/icon/sprite.svg#icon-search" />
        </svg>
        <input
          className="search__text"
          type="search"
          placeholder="Поиск"
          name="search"
        />
      </div>
      <h2 className="centerblock__h2">Треки</h2>
      <div className="centerblock__filter filter">
        <div className="filter__title">Искать по:</div>
        <div className="filter__button button-author _btn-text">
          исполнителю
        </div>
        <div className="filter__button button-year _btn-text">году выпуска</div>
        <div className="filter__button button-genre _btn-text">жанру</div>
      </div>
      <div className="centerblock__content playlist-content">
        <div className="content__title playlist-title">
          <div className="playlist-title__col col01">Трек</div>
          <div className="playlist-title__col col02">Исполнитель</div>
          <div className="playlist-title__col col03">Альбом</div>
          <div className="playlist-title__col col04">
            <svg className="playlist-title__svg">
              <use xlinkHref="img/icon/sprite.svg#icon-watch" />
            </svg>
          </div>
        </div>
        <div className="content__playlist playlist">
          <Track />
        </div>
      </div>
    </div>
  );
}
