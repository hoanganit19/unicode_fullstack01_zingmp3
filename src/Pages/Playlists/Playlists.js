import React, { useEffect, useState } from "react";
import IonIcon from "@reacticons/ionicons";
import "./Playlists.scss";
import useClient from "../../Services/Hooks/useClient";
import { Link, useParams } from "react-router-dom";
import moment from "moment/moment";
import "moment/locale/vi";
import useUrl from "../../Services/Hooks/useUrl";
import SongItem from "./SongItem";
import { useSelector, useDispatch } from "react-redux";
import {
  playerActions,
  playerSelector,
} from "../../Components/Player/playerSlice";
moment.locale("vi");

const { setSong, setPlayerStatus, setEvent } = playerActions;

const Playlists = () => {
  const dispatch = useDispatch();
  const { song: songPlaying, playerStatus } = useSelector(playerSelector);

  const client = useClient();
  const { id } = useParams();
  const [playlist, setPlaylist] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const url = useUrl();
  useEffect(() => {
    getPlaylist();
  }, []);
  const getPlaylist = async () => {
    const res = await client.get(client.playlists + "/" + id);
    setPlaylist(res.data);
    setLoading(false);
  };

  const handlePlaySong = (song) => {
    /*
    - Nếu songPlaying trả về object rỗng
    - Nếu song và songPlaying trùng
    */

    if (songPlaying.id === song.id) {
      dispatch(setPlayerStatus(playerStatus === "play" ? "pause" : "play"));
    } else {
      dispatch(setSong(song));
      dispatch(setEvent("play"));
    }
  };

  const { name, thumbnail, banner, updated_at, singer, follow, songs } =
    playlist;

  return (
    <div className="individual playlist">
      <div className="container">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="individual-ctn2">
            <div className="l-4 m-0 c-0">
              <div className="individual-ctn2-left">
                <div className="playlist-image">
                  <img src={thumbnail} alt="" />{" "}
                </div>

                <div className="playlist-info">
                  <h2>{name}</h2>
                  <p>
                    Cập nhật:{" "}
                    {moment(updated_at, "YYYY-MM-DD H:mm:ss").fromNow()}
                  </p>
                  <p className="singer-list">
                    {singer.map(({ id, name }) => (
                      <Link key={id} to={url.getSinger(id, name)}>
                        {name}
                      </Link>
                    ))}
                  </p>
                  <p>{follow.toLocaleString()} yêu thích</p>
                  <p className="btn-wrap">
                    <button className="btn individual-btn individual-btn-all">
                      <div className="icon">
                        <IonIcon
                          name="play"
                          role="img"
                          className="md hydrated"
                          aria-label="play"
                        />
                      </div>
                      <span>PHÁT TẤT CẢ</span>
                    </button>
                  </p>
                </div>
              </div>
            </div>
            <div className="l-8 m-12 c-12">
              <div className="individual-ctn2-right">
                <ul className="individual-ctn2-song-list">
                  <li
                    className="song-item  individual-ctn2-song-item"
                    data-index={0}
                  >
                    <div
                      className="checkbox-wrapper color-main "
                      data-index={0}
                    >
                      <div className="checkbox">
                        <input type="checkbox" />
                      </div>
                    </div>
                    <div className="individual-ctn2-song-item-img"></div>
                    <div className="individual-ctn2-song-title">Bài hát</div>
                    <div className="individual-ctn2-song-title">Album</div>
                    <div className="individual-ctn2-song-right color-main">
                      Thời gian
                    </div>
                  </li>
                  {songs.length > 0 ? (
                    songs.map((song) => {
                      return (
                        <SongItem
                          onPlaySong={handlePlaySong}
                          key={song.id}
                          {...song}
                          songPlaying={songPlaying}
                        />
                      );
                    })
                  ) : (
                    <p style={{ textAlign: "center" }}>Không có bài hát</p>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Playlists;
