import { Fragment, useEffect } from "react";
import { resolveMedia } from "@/src/media";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function getServerSideProps({ params }) {

  try {
    const res = await fetch(`${API_URL}/api/blog-posts/${params.id}`);
    if (!res.ok) {
      return { notFound: true };
    }
    const post = await res.json();
    return { props: { post } };
  } catch (error) {
    return { notFound: true };
  }
}

const BlogPost = ({ post }) => {
  useEffect(() => {
    document.querySelector("body").classList.add("blog-page");
    return () => document.querySelector("body").classList.remove("blog-page");
  }, []);

  // Split content into paragraphs on blank lines / newlines.
  const paragraphs = (post.content || post.excerpt || "")
    .split(/\n\s*\n|\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <Fragment>
      <a href="/" className="back-btn">
        <i className="fa-solid fa-arrow-left"></i>
      </a>
      <div className="blog-content">
        <h1>My Blog</h1>
        {/* ARTICLE STARTS */}
        <div className="main-post">
          {/* META STARTS */}
          <div className="meta d-flex align-items-center">
            <div className="d-flex align-items-center">
              <i className="fa-regular fa-calendar" />
              <span>{post.post_date}</span>
            </div>
            <div className="d-flex align-items-center">
              <i className="fa-solid fa-tag" />
              <span>{post.category}</span>
            </div>
            <div className="d-flex align-items-center">
              <i className="fa-regular fa-comments" />
              <span>{post.comments} comments</span>
            </div>
          </div>
          {/* META ENDS */}
          {/* CONTENT STARTS */}
          <h3>{post.title}</h3>
          {post.image_url && <img src={resolveMedia(post.image_url)} alt={post.title} />}

          <div className="post-content">
            {paragraphs.length ? (
              paragraphs.map((para, i) => <p key={i}>{para}</p>)
            ) : (
              <p>{post.excerpt}</p>
            )}
          </div>
          {/* CONTENT ENDS */}
        </div>
        {/* ARTICLE ENDS */}
      </div>
    </Fragment>
  );
};
export default BlogPost;
