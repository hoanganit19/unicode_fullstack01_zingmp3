import React, { useEffect, useState } from "react";
import IonIcon from "@reacticons/ionicons";
import SearchSuggest from "./SearchSuggest";
import useClient from "../../../Services/Hooks/useClient";
import { DebounceInput } from "react-debounce-input";
export default function SearchForm() {
  const [isHide, setHide] = useState(true);
  const [songs, setSongs] = useState([]);
  const [suggests, setSuggests] = useState([]);
  const [trending, setTrending] = useState([]);
  const [keywords, setKeywords] = useState("");

  const client = useClient();

  useEffect(() => {
    getTrending();
    document.addEventListener("click", () => {
      handlFocusSearch(true);
    });

    document.addEventListener("keyup", (e) => {
      if (e.code === "Escape") {
        handlFocusSearch(true);
      }
    });
  }, []);

  const getSongs = async (keywords) => {
    if (keywords !== "") {
      const songs = await client.get(client.songs, { q: keywords });
      setSongs(songs);
    } else {
      setSongs([]);
    }
  };

  const getSuggests = async (keywords) => {
    const suggests = await client.get(client.keywords, { q: keywords });
    setSuggests(suggests);
  };

  const handlFocusSearch = (status) => {
    setHide(status);
  };

  const handleSearch = (e) => {
    const keywords = e.target.value;

    getSongs(keywords);
    getSuggests(keywords);
    setKeywords(keywords);
  };

  const postKeywords = async (keyword) => {
    const { response, data } = await client.get(client.keywords, {
      keyword: keyword,
    });

    if (response.ok && data.length == 0) {
      await client.post(client.keywords, {
        keyword: keyword,
      });
    }
  };

  const handlePostKeywords = () => {
    if (keywords !== "") {
      postKeywords(keywords);
    }
  };

  const getTrending = async () => {
    const res = await client.get(client.trendingSearch);
    setTrending(res.data);
  };

  const handleClickSuggest = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="zing-search">
      <div className="search-icon color-main">
        <IonIcon
          name="search-outline"
          role="img"
          className="md hydrated"
          aria-label="search outline"
        />
      </div>
      <DebounceInput
        debounceTimeout={500}
        className="color-main"
        element="input"
        placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
        onFocus={(e) => {
          handlFocusSearch(false);
        }}
        onChange={handleSearch}
        onClick={(e) => {
          e.stopPropagation();
        }}
      />
      {/* ------------------------- */}
      <SearchSuggest
        isHide={isHide}
        songs={songs}
        suggests={suggests}
        onPostKeywords={handlePostKeywords}
        trending={trending}
        onClick={handleClickSuggest}
        onFofusSearch={handlFocusSearch}
      />
    </div>
  );
}

/*
TH1: onClick ra ngoài search suggest => Đóng suggest
TH2: onClick vào search suggest:
- Click vào text, nút play => Không tắt
- Click vào link => Tắt và chuyển trang

*/
