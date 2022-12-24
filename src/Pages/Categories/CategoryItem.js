import React from "react";
import PropTypes from "prop-types";
import useUrl from "../../Services/Hooks/useUrl";
import { Link } from "react-router-dom";

function CategoryItem({ id, thumbnail, name, playlists }) {
  const url = useUrl();
  const getRecentPlaylists = () => {
    const jsx = [];
    if (playlists.length) {
      for (let index in playlists) {
        jsx.push(
          <img
            src={playlists[index].thumbnail}
            alt={playlists[index].name}
            key={playlists[index].id}
          />
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
      <Link to={url.getCategory(id, name)}>
        <img src={thumbnail} alt="" />
        <div className="categories--item--info">
          <h2>{name}</h2>
          <div className="categories__playlists">{getRecentPlaylists()}</div>
        </div>
      </Link>
    </div>
  );
}

CategoryItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  playlists: PropTypes.array.isRequired,
};

export default CategoryItem;
