import { useEffect, useState } from "react";
import { getPostsAPI } from "@/api/posts";
import { Link } from "react-router-dom";

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getPostsAPI();
        setPosts(res.data);
      } catch (err) {
        console.error("Failed to load posts:", err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">Blog Posts</h2>
        <Link to="/posts/create" className="btn btn-outline-primary">
          + Create Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="alert alert-info text-center">No posts available yet.</div>
      ) : (
        <div className="row g-4">
          {posts.map((post) => (
            <div className="col-md-6 col-lg-6" key={post.id}>
              <div className="card h-100 shadow-lg border-0">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-dark">{post.title}</h5>
                   <hr />
                  <p className="card-text text-muted">
                    {post.content.length > 120
                      ? post.content.slice(0, 120) + "..."
                      : post.content}
                  </p>
                  <Link
                    to={`/posts/${post.id}`}
                    className="btn btn-sm btn-primary mt-auto align-self-end"
                  >
                     Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
