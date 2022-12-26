import React, { Fragment } from "react";
import PropTypes from "prop-types";
import useUrl from "../../Services/Hooks/useUrl";
import { Link } from "react-router-dom";

function PlaylistItem({ id, name, thumbnail, singer }) {
  const url = useUrl();

  const getSingerList = () => {
    const jsx = [];
    let seps = ", ";
    if (singer.length) {
      for (let index in singer) {
        if (singer.length >= 3) {
          if (index == 2) {
            seps = null;
          }
        } else {
          if (index == singer.length - 1) {
            seps = null;
          }
        }
        jsx.push(
          <Fragment key={singer[index].id}>
            <Link to={url.getSinger(singer[index].id, singer[index].name)}>
              {singer[index].name}
            </Link>
            {seps}
          </Fragment>
        );

        if (index == 2) {
          break;
        }
      }
    }

    return jsx;
  };

  return (
    <div className="categories--item">
      <Link to={url.getPlaylist(id, name)}>
        <img src={thumbnail} />
        <h2>{name}</h2>
      </Link>
      <div className="singer">{getSingerList()}...</div>
    </div>
  );
}

PlaylistItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  singer: PropTypes.array.isRequired,
};

export default PlaylistItem;
