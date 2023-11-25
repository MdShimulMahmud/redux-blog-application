import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import GoHome from "../components/description/GoHome";
import PostDescription from "../components/description/PostDescription";
import RelatedPosts from "../components/description/RelatedPosts";
import Loading from "../components/ui/Loading";
import { fetchBlog } from "../features/blog/blogSlice";
const Post = () => {
  const { blog, isLoading, isError, error } = useSelector(
    (state) => state.blog
  );
  const dispatch = useDispatch();
  const { blogId } = useParams();

  useEffect(() => {
    dispatch(fetchBlog(blogId));
  }, [dispatch, blogId]);

  const { title, description, image, tags, likes, isSaved, createdAt } =
    blog || {};

  // decide what to render
  let content = null;
  if (isLoading) content = <Loading />;

  if (!isLoading && isError)
    content = <div className="col-span-12">{error}</div>;

  if (!isLoading && !isError && !blog?.id) {
    content = <div className="col-span-12">No blog found!</div>;
  }

  if (!isLoading && !isError && blog?.id) {
    content = (
      <section className="post-page-container">
        <PostDescription blog={blog} />
        <RelatedPosts currentBlogId={blog.id} tags={tags} />
      </section>
    );
  }

  return (
    <>
      <GoHome />
      {content}
    </>
  );
};

export default Post;
