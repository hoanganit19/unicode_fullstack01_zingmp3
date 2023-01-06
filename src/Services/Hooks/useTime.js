import React from "react";

const useTime = () => {
  return {
    getMins: function (seconds) {
      const mins = Math.floor(seconds / 60);
      seconds = Math.floor(seconds - mins * 60);
      return `${mins < 10 ? "0" + mins : mins}:${
        seconds < 10 ? "0" + seconds : seconds
      }`;
    },
  };
};

export default useTime;
