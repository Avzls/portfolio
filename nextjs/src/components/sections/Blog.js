import Link from "next/link";
import { resolveMedia } from "@/src/media";

const Blog = ({ posts }) => {

  const items = posts || [];

  return (
    <section className="blog main-section flex-column-mobile" id="blog">
      {/* TITLE STARTS */}
      <div className="custom-title">
        <h3>
          <span>
            <span className="animated-layer fade-in-left-animation fadeInUp wow">
              Latest Posts
            </span>
          </span>
        </h3>
      </div>
      {/* TITLE ENDS */}
      {/* LATEST POSTS STARTS */}
      <div className="latestposts flex-column-mobile">
        {items.map((post) => (
          <div key={post.id} className="animated-layer fade-in-right-animation fadeInUp wow">
            <Link href={`/blog/${post.id}`} legacyBehavior>

              <a>
                <span className="img-holder">
                  <img src={resolveMedia(post.image_url)} alt={post.title} />

                </span>
                <div className="content">
                  <span className="category">{post.category}</span>
                  <span className="title">{post.title}</span>
                  <p>{post.excerpt}</p>
                  <div className="meta d-flex align-items-center">
                    <div className="d-flex align-items-center">
                      <i className="fa-regular fa-calendar" />
                      <span>{post.post_date}</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <i className="fa-regular fa-comments" />
                      <span>{post.comments} comments</span>
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
      {/* LATEST POSTS ENDS */}
    </section>
  );
};
export default Blog;
