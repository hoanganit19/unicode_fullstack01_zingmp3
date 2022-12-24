import { Route } from "react-router-dom";

import Home from "../Pages/Home/Home";
import Categories from "../Pages/Categories/Categories";
import Category from "../Pages/Categories/Category";

export const publicRoutes = (
  <>
    <Route path="/" element={<Home />} />
    <Route path="/the-loai">
      <Route path="" element={<Categories />} />
      <Route path=":slug-:id.html" element={<Category />} />
    </Route>
  </>
);
