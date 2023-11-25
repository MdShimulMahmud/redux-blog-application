import React from "react";
import { Link } from "react-router-dom";

const RelatedPostItem = ({ blog }) => {
  const { image, id, title, tags, createdAt } = blog;
  const updatedTags = tags.map((tag) => `#${tag}`);

  return (
    <div className="card">
      <Link to={`/blogs/${id}`}>
        <img src={image} className="card-image" alt="" />
      </Link>
      <div className="p-4">
        <Link to="/blogs/1" className="text-lg post-title lws-RelatedPostTitle">
          {title}
        </Link>
        <div className="mb-0 tags">
          {updatedTags.map((tag) => (
            <span>{tag} </span>
          ))}
        </div>
        <p>{createdAt}</p>
      </div>
    </div>
  );
};

export default RelatedPostItem;
