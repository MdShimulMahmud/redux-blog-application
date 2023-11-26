import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleSavedStatus } from "../../features/blogs/blogsSlice";
const PostDescription = ({ blog }) => {
  const { id, title, description, image, tags, likes, isSaved } = blog;

  const dispatch = useDispatch();

  const [like, setLike] = useState(likes);
  const [text, setText] = useState(isSaved);

  const handleToggleSaved = (blogId) => {
    setText(!text);
    dispatch(toggleSavedStatus({ blogId }));
  };

  return (
    <main className="post">
      <img
        src={image}
        alt="githum"
        className="w-full rounded-md"
        id="lws-megaThumb"
      />
      <div>
        <h1 className="mt-6 text-2xl post-title" id="lws-singleTitle">
          {title}
        </h1>
        <div className="tags" id="lws-singleTags">
          <div className="lws-tags">
            {Array.isArray(tags) &&
              tags.map((tag) => <span key={tag}>#{tag}</span>)}
          </div>
        </div>
        <div className="btn-group">
          {/* <!-- handle like on button click --> */}
          <button
            onClick={() => setLike((like) => (like += 1))}
            className="like-btn"
            id="lws-singleLinks"
          >
            <i className="fa-regular fa-thumbs-up"></i> {like}
          </button>
          {/* <!-- handle save on button click -->
          <!-- use ".active" class and "Saved" text  if a post is saved, other wise "Save" --> */}
          <button
            className={text ? "active save-btn" : "save-btn"}
            id="lws-singleSavedBtn"
            onClick={() => handleToggleSaved(id)}
          >
            <i className="fa-regular fa-bookmark"> </i>
            {text === true ? "Saved" : "Save"}
          </button>
        </div>
        <div className="mt-6">
          <p>{description}</p>
        </div>
      </div>
    </main>
  );
};

export default PostDescription;
