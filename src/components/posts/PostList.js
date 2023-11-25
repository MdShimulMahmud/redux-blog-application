import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../features/blogs/blogsSlice";
import Loading from "../ui/Loading";
import PostListItem from "./PostListItem";
const PostList = () => {
  const dispatch = useDispatch();
  const { blogs, isLoading, isError, error } = useSelector(
    (state) => state.blogs
  );

  // const { tags, search } = useSelector((state) => state.filters);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  let content;

  if (isLoading) content = <Loading />;
  if (!isLoading && isError)
    content = <div className="col-span-12">{error}</div>;

  if (!isError && !isLoading && blogs?.length === 0) {
    content = <div className="col-span-12">No blogs found!</div>;
  }

  if (!isError && !isLoading && blogs?.length > 0) {
    content = blogs.map((blog) => <PostListItem key={blog.id} blog={blog} />);
  }

  return (
    <main className="post-container" id="lws-postContainer">
      {content}
    </main>
  );
};

export default PostList;
