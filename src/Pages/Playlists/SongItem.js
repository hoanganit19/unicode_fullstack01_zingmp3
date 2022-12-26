import React from "react";
import PropTypes from "prop-types";
import IonIcon from "@reacticons/ionicons";
import useUrl from "../../Services/Hooks/useUrl";
import { Link } from "react-router-dom";

function SongItem({ id, name, image, singles, duration }) {
  const url = useUrl();
  return (
    <li className="song-item  individual-ctn2-song-item" data-index={0}>
      <div className="checkbox-wrapper color-main " data-index={0}>
        <IonIcon
          className="checkBox-icon-music md hydrated"
          name="musical-notes-outline"
          role="img"
          aria-label="musical notes outline"
        />
        <div className="checkbox">
          <input type="checkbox" />
        </div>
      </div>
      <div className="individual-ctn2-song-item-img">
        <img src={image} alt="" className="individual-ctn2-song-img" />
        <div className="individual-ctn2-song-item-icon" data-index={0}>
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
        <span className="color-title">{name}</span>
        <small className="color-small singer-list">
          {singles.map(({ id, name }) => (
            <Link
              key={id}
              className="singer color-small"
              to={url.getSinger(id, name)}
            >
              {name}
            </Link>
          ))}
        </small>
      </div>
      <div className="zingchart-body-main  color-small c-0">
        <span className="title">{name}</span>
        <span className="singer">(singer)</span>
      </div>
      <div className="individual-ctn2-song-right color-main">
        <div className="individual-ctn2-song-right-icon">
          <div className="icon-video c-0 m-0">
            <IonIcon
              name="videocam"
              role="img"
              className="md hydrated"
              aria-label="videocam"
            />
          </div>
          <div className="icon-favorite color-small " data-index={0}>
            <div className="no-favorite icon action-hover">
              <IonIcon
                name="heart-outline"
                role="img"
                className="md hydrated"
                aria-label="heart outline"
              />
            </div>
            <div className="yes-favorite icon action-hover">
              <IonIcon
                name="heart"
                role="img"
                className="md hydrated"
                aria-label="heart"
              />
            </div>
          </div>
        </div>
        <div className="time">
          <div className="song-time">{duration}</div>
          <IonIcon
            name="ellipsis-horizontal-outline"
            role="img"
            className="md hydrated"
            aria-label="ellipsis horizontal outline"
          />
        </div>
      </div>
    </li>
  );
}

SongItem.propTypes = {};

export default SongItem;
