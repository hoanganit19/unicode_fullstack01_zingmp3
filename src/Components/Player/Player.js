import React, { useEffect, useRef } from "react";
import IonIcon from "@reacticons/ionicons";

let isMouseDown = false;
let initialClientX = 0;
let initialRate = 0;

export default function Player() {
  console.log("re-render");
  const timerRangerRef = useRef();

  useEffect(() => {
    document.addEventListener("mousemove", (e) => {
      //console.log(isMouseDown);
      if (isMouseDown) {
        e.target.style.userSelect = "none";
        handleDragTimer(e);
      }
    });
    document.addEventListener("mouseup", handleClickUpTimer);
  }, []);

  const getRateTimer = (offsetX) => {
    const progressWith = timerRangerRef.current.clientWidth;
    // console.log(offsetX);
    const rate = (offsetX / progressWith) * 100;
    return rate;
  };

  //(parseInt(initialSize) + parseInt(e.clientX - initialPos))

  const handleClickProgress = (e) => {
    initialClientX = e.clientX; //clientX ban đầu
    isMouseDown = true;
    const rate = getRateTimer(e.nativeEvent.offsetX);
    timerRangerRef.current.children[0].style.width = `${rate}%`;
    initialRate = rate;
    console.log(rate);
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
      }
    });
  };

  const getRateMove = async (e) => {
    //Tính clientX hiện tại
    const clientX = e.clientX;

    // console.log(clientX);

    //Khoảng đã kéo
    const spaceMove = clientX - initialClientX;

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
    isMouseDown = true;
  };

  const handleClickUpTimer = (e) => {
    isMouseDown = false;
  };

  return (
    <div className="zing-controls">
      <div className="audio">
        <audio src="./music/list-song/13.m4a" />
      </div>
      <div className="l-4 m-3 c-9">
        <div className=" zing-control-left zing-control-left-action">
          <div className="control-left-img " style={{ marginLeft: 0 }}>
            <img src="/img/songs/13.webp" alt="" />
          </div>
          <div className="control-left-title">
            <h1 className="color-title">2 Phút Hơn</h1>
            <small className="color-small">Phao, KAIZ Remix</small>
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
              <div className="play-music control-icon action-hover  color-title">
                <IonIcon
                  name="play-outline"
                  role="img"
                  className="md hydrated"
                  aria-label="play outline"
                />
              </div>
              <div className="pause-music control-icon action-hover  color-title ">
                <IonIcon
                  name="pause-circle-outline"
                  role="img"
                  className="md hydrated"
                  aria-label="pause circle outline"
                />
              </div>
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
              <span className="minute">00</span>:
              <span className="second">00</span>
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
            <div className="time-end color-title">05:02</div>
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
