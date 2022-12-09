import React, { useState } from "react";
import IonIcon from "@reacticons/ionicons";
import SearchSuggest from "./SearchSuggest";
export default function SearchForm() {
  const [isHide, setHide] = useState(true);

  const handlFocusSearch = (status) => {
    setHide(status);
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
      <input
        className="color-main"
        type="text"
        placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
        onFocus={() => {
          handlFocusSearch(false);
        }}
        onBlur={() => {
          handlFocusSearch(true);
        }}
      />
      {/* ------------------------- */}
      <SearchSuggest isHide={isHide} />
    </div>
  );
}
