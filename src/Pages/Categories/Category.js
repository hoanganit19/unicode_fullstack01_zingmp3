import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Categories.scss";
import useClient from "../../Services/Hooks/useClient";
import PlaylistItem from "./PlaylistItem";
import Error404 from "../../Errors/Error404";

const Category = () => {
  const { id } = useParams();
  const client = useClient();
  const [category, setCategory] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getPlaylists();
  }, []);

  const getPlaylists = async () => {
    const res = await client.get(client.categories + "/" + id);
    console.log(res.response);
    if (res.response.ok) {
      const category = res.data;
      setCategory(category);
    }

    setLoading(false);
  };

  const { banner, playlists } = category;

  return (
    <div className="categories">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="categories__banner">
            <div className="container">
              <img src={banner} alt="" style={{ width: "100%" }} />
            </div>
          </div>
          <div className="container">
            <div className="categories__list">
              {playlists?.length ? (
                playlists?.map((playlist) => (
                  <PlaylistItem key={playlist.id} {...playlist} />
                ))
              ) : (
                <p>Không có playlist</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Category;
