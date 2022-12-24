import React, { useEffect, useState } from "react";
import "./Categories.scss";
import useClient from "../../Services/Hooks/useClient";
import CategoryItem from "./CategoryItem";

export default function Categories() {
  const client = useClient();
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const res = await client.get(client.categories);
    const categories = res.data;
    setCategories(categories);
    setLoading(false);
  };

  return (
    <div className="categories">
      <div className="categories__banner">
        <div className="container">
          <img
            src="https://photo-zmp3.zmdcdn.me/cover/c/5/f/d/c5fd5a2092ba742c23782124fc0e59cc.jpg"
            alt=""
          />
        </div>
      </div>
      <div className="container">
        {!isLoading && (
          <div className="categories__list">
            {categories.map((category) => (
              <CategoryItem key={category.id} {...category} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
