import React from "react";
import slugify from "react-slugify";

const useUrl = () => {
  const url = {
    profile: "/ca-nhan",
    account: "/ca-nhan/tai-khoan",
    getCategory: function (id, name) {
      const slug = slugify(name);
      return `/the-loai/${slug}-${id}.html`;
    },
    getPlaylist: function (id, name) {
      const slug = slugify(name);
      return `/danh-sach-phat/${slug}-${id}.html`;
    },
    getSinger: function (id, name) {
      const slug = slugify(name);
      return `/ca-sy/${slug}-${id}.html`;
    },
  };
  return url;
};

export default useUrl;
