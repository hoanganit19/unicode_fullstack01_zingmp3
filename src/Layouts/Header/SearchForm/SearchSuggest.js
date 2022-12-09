import React from "react";
import clsx from "clsx";

export default function SearchSuggest({ isHide }) {
  return (
    <div className={clsx("info-search", isHide && "hide")}>
      <div className="info-search-main">
        <div className="suggest ">
          <div className="suggest-header">
            <h1 className="color-title">Gợi Ý Cho Bạn</h1>
          </div>
          <div className="suggest-body">
            <li className="item">
              <span className="color-small">
                <i className="fa-solid fa-arrow-trend-up" />
              </span>
              <span className="title color-main">Tây Sơn Hào Kiệt</span>
            </li>
            <li className="item">
              <span className="color-small">
                <i className="fa-solid fa-arrow-trend-up" />
              </span>
              <span className="title color-main">Ngôi Sao Cô Đơn</span>
            </li>
            <li className="item">
              <span className="color-small">
                <i className="fa-solid fa-arrow-trend-up" />
              </span>
              <span className="title color-main">Lặng Yên</span>
            </li>
            <li className="item">
              <span className="color-small">
                <i className="fa-solid fa-arrow-trend-up" />
              </span>
              <span className="title color-main">Đom Đóm</span>
            </li>
          </div>
        </div>
        <div className="show">
          <div className="keywords">
            <div className="suggest-header">
              <h1 className="color-title">Từ Khóa Liên Quan</h1>
            </div>
            <div className="suggest-body">
              <li className="item">
                <span className="color-small">
                  <i className="fa-solid fa-arrow-trend-up" />
                </span>
                <span className="title color-main">Tây Sơn Hào Kiệt</span>
              </li>
              <li className="item">
                <span className="color-small">
                  <i className="fa-solid fa-arrow-trend-up" />
                </span>
                <span className="title color-main">Ngôi Sao Cô Đơn</span>
              </li>
              <li className="item">
                <span className="color-small">
                  <i className="fa-solid fa-arrow-trend-up" />
                </span>
                <span className="title color-main">Lặng Yên</span>
              </li>
              <li className="item ">
                <span className="color-small">
                  <i className="fa-solid fa-arrow-trend-up" />
                </span>
                <span className="title color-main">Đom Đóm</span>
              </li>
            </div>
          </div>
          <div className="recently">
            <div className="header">
              <h1 className="color-title">Gợi ý kết quả</h1>
            </div>
            <div className="body"> </div>
          </div>
        </div>
      </div>
    </div>
  );
}
