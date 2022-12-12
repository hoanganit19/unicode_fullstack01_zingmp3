import React, { useEffect } from "react";
import clsx from "clsx";
import IonIcon from "@reacticons/ionicons";
import { Link } from "react-router-dom";

export default function SearchSuggest({
  isHide,
  songs,
  suggests,
  onPostKeywords,
  trending,
}) {
  const handleClickResult = () => {
    onPostKeywords();
  };

  return (
    <div className={clsx("info-search", isHide && "hide")}>
      <div className="info-search-main">
        {songs.data?.length > 0 ? (
          <div className="show-Results">
            <div className="keywords">
              <div className="suggest-header">
                <h1 className="color-title">Từ Khóa Liên Quan</h1>
              </div>
              <div className="suggest-body">
                {suggests.data?.length > 0 &&
                  suggests.data.map(({ id, keyword }) => {
                    return (
                      <li className="item" key={id} onClick={handleClickResult}>
                        <span className="color-small">
                          <i className="fa-solid fa-arrow-trend-up" />
                        </span>
                        <span className="title color-main">{keyword}</span>
                      </li>
                    );
                  })}
              </div>
            </div>
            <div className="recently">
              <div className="header">
                <h1 className="color-title">Gợi ý kết quả</h1>
              </div>
              <div className="body">
                {songs.data.map(({ id, image, name, singles }) => {
                  const singleJsx = singles?.map(({ id, name }) => {
                    return (
                      <Link
                        key={id}
                        className="singer color-small"
                        to={"/ca-sy/" + id}
                      >
                        {name}
                      </Link>
                    );
                  });
                  return (
                    <li
                      className="song-item recently-song-item "
                      key={id}
                      onClick={handleClickResult}
                    >
                      <div className="individual-ctn2-song-item-img">
                        <img
                          src={image}
                          alt={name}
                          className="individual-ctn2-song-img"
                        />
                        <div className="individual-ctn2-song-item-icon">
                          <IonIcon
                            name="play"
                            role="img"
                            className="md hydrated"
                            aria-label="play"
                          />
                        </div>
                        <div className="icon-play-song ">
                          <img
                            src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="individual-ctn2-song-title">
                        <span className="color-title">
                          <Link to={"/bai-hat/abc"}>{name}</Link>
                        </span>
                        <small className="color-small">{singleJsx}</small>
                      </div>
                    </li>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="suggest ">
            <div className="suggest-header">
              <h1 className="color-title">Gợi Ý Cho Bạn</h1>
            </div>
            <div className="suggest-body">
              {trending.length > 0 &&
                trending.map(({ id, name }) => {
                  return (
                    <li className="item" key={id}>
                      <span className="color-small">
                        <i className="fa-solid fa-arrow-trend-up" />
                      </span>
                      <span className="title color-main">{name}</span>
                    </li>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
