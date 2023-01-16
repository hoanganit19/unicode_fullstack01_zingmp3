import React, { useEffect, useRef, useState } from "react";
import IonIcon from "@reacticons/ionicons";
import useTime from "../../Services/Hooks/useTime";
import { useSelector, useDispatch } from "react-redux";
import { playerSelector } from "./playerSlice";
import { playerActions } from "./playerSlice";
import clsx from "clsx";

let isMouseDown = false;
let initialClientX = 0;
let initialRate = 0;
let currentTime = 0;
let isSeeking = false;
let currentRate = 0;

const { setPlayerStatus, setEvent } = playerActions;

export default function Player() {
  const dispatch = useDispatch();
  const { playerStatus, song, event } = useSelector(playerSelector);

  const time = useTime();
  const timerRangerRef = useRef();
  const audioRef = useRef();
  const [duration, setDuration] = useState(0);
  // const [isFirstLoad, setIsFirstLoad] = useState(false);

  useEffect(() => {
    if (duration > 0) {
      document.addEventListener("mousemove", (e) => {
        if (isMouseDown) {
          e.target.style.userSelect = "none";
          handleDragTimer(e);
        }
      });
      document.addEventListener("mouseup", handleClickUpTimer);
    }
  }, [duration]);

  //console.log(song);

  useEffect(() => {
    if (Object.keys(song).length > 0 && event !== null) {
      audioRef.current.currentTime = 0;
      handlePlay(true);
      dispatch(setEvent(null));
      localStorage.setItem("currentSong", song.id);
    }
  }, [song]);

  // useEffect(() => {
  //   if (Object.keys(song).length > 0) {
  //     setIsFirstLoad(true);
  //   }
  // }, [status]);

  useEffect(() => {
    if (playerStatus === "play") {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [playerStatus]);

  //Phương thức xử lý liên quan đến audio
  const loadDataAudio = () => {
    const duration = audioRef.current.duration;
    setDuration(duration);
  };

  const setCurrentTime = (rate) => {
    /*
    rate = current / duration * 100
    => current = rate * duration / 100
    */
    currentTime = (rate * duration) / 100;

    timerRangerRef.current.previousElementSibling.children[0].innerText =
      time.getMins(currentTime);
  };

  const getRateTimer = (offsetX) => {
    const progressWith = timerRangerRef.current.clientWidth;

    const rate = (offsetX / progressWith) * 100;
    return rate;
  };

  const handleClickProgress = (e) => {
    initialClientX = e.clientX; //clientX ban đầu
    isMouseDown = true;
    const rate = getRateTimer(e.nativeEvent.offsetX);
    timerRangerRef.current.children[0].style.width = `${rate}%`;
    initialRate = rate;
    currentRate = rate;
    setCurrentTime(rate);
    audioRef.current.currentTime = (rate * duration) / 100;
  };

  const handleDragTimer = (e) => {
    //const rate = getRateTimer(e.offsetX);
    //console.log(e.clientX);

    const rate = getRateMove(e);

    rate.then((rate) => {
      if (rate < 0) {
        rate = 0;
      }

      if (rate > 100) {
        rate = 100;
      }

      if (rate >= 0 && rate <= 100) {
        timerRangerRef.current.children[0].style.width = `${rate}%`;

        setCurrentTime(rate);

        isSeeking = true;

        currentRate = rate;
      }
    });
  };

  const getRateMove = async (e) => {
    //Tính clientX hiện tại
    const clientX = e.clientX;

    //Khoảng đã kéo
    const spaceMove = clientX - initialClientX;

    //console.log(clientX, initialClientX);

    const rate = getRateTimer(spaceMove) + initialRate;

    return rate;
  };

  // const handleMouseOverTimer = (e) => {
  //   console.log(e);
  // };

  const handleClickDownTimer = (e) => {
    e.stopPropagation();
    //console.log("click down", e.clientX);
    initialClientX = e.clientX;
    //console.log(initialClientX);
    isMouseDown = true;
  };

  const handleClickUpTimer = (e) => {
    isMouseDown = false;
    isSeeking = false;
    initialRate = currentRate;
    audioRef.current.currentTime = currentTime;
  };

  //Click vào nút play
  const handlePlay = (forcePlay = false) => {
    if (!forcePlay) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }

      //Cập nhật state lên redux
      dispatch(setPlayerStatus(audioRef.current.paused ? "paused" : "play"));
    } else {
      audioRef.current.play();
      dispatch(setPlayerStatus("play"));
    }
  };

  //Cập nhật timer khi nhạc chạy
  const handleTimeUpdate = () => {
    const currentTime = audioRef.current.currentTime;
    //Tỉnh tỷ lệ phần trăm
    const rate = (currentTime / duration) * 100;
    if (!isSeeking) {
      setCurrentTime(rate);
      timerRangerRef.current.children[0].style.width = `${rate}%`;
    }
  };

  //Xử lý khi hết bài
  const handleEnded = () => {
    audioRef.current.load();
    dispatch(setPlayerStatus("pause"));
  };

  const { name, image, source, singles } = song;

  return (
    <div className="zing-controls">
      <div className="audio">
        <audio
          src={source}
          ref={audioRef}
          onLoadedData={loadDataAudio}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
        />
      </div>
      <div className="l-4 m-3 c-9">
        <div className=" zing-control-left zing-control-left-action">
          <div className="control-left-img " style={{ marginLeft: 0 }}>
            <img src={image} alt="" />
          </div>
          <div className="control-left-title">
            <h1 className="color-title">{name}</h1>
            <small className="color-small player-singes">
              {singles?.map(({ id, name }) => (
                <span key={id}>{name}</span>
              ))}
            </small>
          </div>
          <div className="icon-favorite color-small " data-index="${index}">
            <div className="no-favorite zingchart-icon icon-tym action-hover">
              <IonIcon
                name="heart-outline"
                role="img"
                className="md hydrated"
                aria-label="heart outline"
              />
            </div>
            <div className="yes-favorite zingchart-icon icon-tym action-hover">
              <IonIcon
                name="heart"
                role="img"
                className="md hydrated"
                aria-label="heart"
              />
            </div>
          </div>
          <div className="control-left-icon m-0">
            <div className="item icon action-hover  color-title m-0 ">
              <IonIcon
                name="ellipsis-horizontal-outline"
                role="img"
                className="md hydrated"
                aria-label="ellipsis horizontal outline"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="l-4 m-6 c-3">
        <div className="zing-control-main">
          <div className="controls">
            <div className="repeat control-icon action-hover color-title action-controls">
              <i className="fa-solid fa-repeat" />
            </div>
            <div className="icon-control-left control-icon action-hover  color-title c-0">
              <i className="fa-solid fa-backward-step" />
            </div>
            <div className="play c-0">
              <div
                className="play-music control-icon action-hover  color-title"
                onClick={() => {
                  handlePlay(false);
                }}
              >
                <IonIcon
                  name={clsx(
                    playerStatus === "play"
                      ? "pause-circle-outline"
                      : "play-outline"
                  )}
                  role="img"
                  className="md hydrated"
                  aria-label="play outline"
                />
              </div>
              {/* <div className="pause-music control-icon action-hover  color-title ">
                <IonIcon
                  name="pause-circle-outline"
                  role="img"
                  className="md hydrated"
                  aria-label="pause circle outline"
                />
              </div> */}
            </div>
            <div className="icon-control-right control-icon action-hover color-title ">
              <i className="fa-solid fa-forward-step" />
            </div>
            <div className="icon-shuffle control-icon action-hover color-title c-0 action-controls">
              <i className="fa-solid fa-shuffle" />
            </div>
          </div>
          <div className="control-handle-time c-0">
            <div className="time-begin color-title">
              <span className="minute">00:00</span>
            </div>
            <div
              className="progress"
              ref={timerRangerRef}
              onMouseDown={handleClickProgress}
            >
              <div className="progressCurrent" style={{ width: "0" }}>
                <span onMouseDown={handleClickDownTimer}></span>
              </div>
            </div>
            <div className="time-end color-title">{time.getMins(duration)}</div>
          </div>
        </div>
      </div>
      <div className="l-4 m-3 c-0 ">
        <div className="zing-control-right">
          <div className="media control-icon action-hover  color-title m-0 ">
            <i className="fa-solid fa-photo-film" />
          </div>
          <div className="micro control-icon action-hover  color-title m-0">
            <i className="fa-solid fa-microphone" />
          </div>
          <div className="volume ">
            <div className="volume-play control-icon action-hover  color-title">
              <i className="fa-solid fa-volume-low" />
            </div>
            <div className="volume-pause control-icon action-hover  color-title hide">
              <i className="fa-solid fa-volume-xmark" />
            </div>
            <div className="volume-control color-title">
              <div className="volume-control-play" />
            </div>
          </div>
          <div className="list-song control-icon action-hover color-title ">
            <i className="fa-solid fa-list-ul" />
          </div>
        </div>
      </div>
    </div>
  );
}
