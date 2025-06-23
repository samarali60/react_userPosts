import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/auth";
import { getPostsAPI } from "@/api/posts";

export default function HomePage() {
  console.log("HomePage rendered");
  const { token } = useAuthStore();
  const [latestPosts, setLatestPosts] = useState([]);


  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const res = await getPostsAPI();
        const sorted = res.data.reverse().slice(0, 3);
        setLatestPosts(sorted);
      } catch (err) {
        console.error("Error loading posts:", err);
      }
    };

    fetchLatestPosts();
  }, []);

  return (
    <div className="text-center my-5">
      <h1 className="fw-bold text-primary mb-3"> Welcome to MyBlog</h1>
      <p className="text-muted fs-5"> You can write and share your thoughts.</p>

      {token ? (
        <Link to="/posts/create" className="btn btn-success px-4 mt-3">
          + Create Post
        </Link>
      ) : (
        <Link to="/login" className="btn btn-primary px-4 mt-3">
          Login to Write{" "}
        </Link>
      )}

      <hr className="my-5" />

      <h4 className="mb-4 text-secondary"> Latest Posts</h4>

      <div className="row justify-content-center">
        {latestPosts.length === 0 ? (
          <p className="text-muted">No posts available.</p>
        ) : (
          latestPosts.map((post) => (
            <div key={post.id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-primary">{post.title}</h5>
                  <p className="card-text text-muted flex-grow-1">
                    {post.content.slice(0, 80)}...
                  </p>
                  <Link
                    to={`/posts/${post.id}`}
                    className="btn btn-outline-primary mt-auto"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
