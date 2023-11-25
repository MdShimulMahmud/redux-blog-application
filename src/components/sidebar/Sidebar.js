import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchBlogs, filters } from "../../features/blogs/blogsSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  // const {likes, createdAt} = useSelector(state=>state.blogs)

  const [value, setValue] = useState("default");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const [selectedFilter, setSelectedFilter] = useState("all");

  const handleRadioChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedFilter(selectedValue);
  };

  useEffect(() => {
    if (value === "most_liked") {
      let query = `_sort=likes&_order=desc`;
      dispatch(fetchBlogs(query));
    } else if (value === "newest") {
      let query = `_sort=createdAt&_order=desc`;
      dispatch(fetchBlogs(query));
    } else {
      dispatch(fetchBlogs());
    }
  }, [dispatch, value]);

  useEffect(() => {
    if (selectedFilter === "all") {
      dispatch(fetchBlogs());
    } else {
      dispatch(filters());
    }
  }, [dispatch, selectedFilter]);

  return (
    <aside>
      <div className="sidebar-items">
        <div className="sidebar-content">
          <h4>Sort</h4>
          <select
            value={value}
            onChange={handleChange}
            name="sort"
            id="lws-sort"
            className="w-full max-w-[150px] border-2 rounded-md text-gray-500"
          >
            <option value="default">Default</option>
            <option value="newest">Newest</option>
            <option value="most_liked">Most Liked</option>
          </select>
        </div>
        <div className="sidebar-content">
          <h4>Filter</h4>
          <div className="radio-group">
            <div>
              <input
                onChange={handleRadioChange}
                value="all"
                type="radio"
                name="filter"
                id="lws-all"
                checked={selectedFilter === "all"}
                className="radio"
              />
              <label for="lws-all">All</label>
            </div>
            <div>
              <input
                onChange={handleRadioChange}
                value="saved"
                type="radio"
                name="filter"
                id="lws-saved"
                checked={selectedFilter === "saved"}
                className="radio"
              />
              <label for="lws-saved">Saved</label>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
