import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { deletePostAPI, getSinglePostAPI, updatePostAPI } from "@/api/posts";

export default function SinglePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [alertMessage, setAlertMessage] = useState(""); // ✅ حالة الرسالة

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await getSinglePostAPI(id);
        setPost(res.data);
        setFormData({ title: res.data.title, content: res.data.content });
      } catch (err) {
        console.error("Error fetching post", err);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePostAPI(id);
        navigate("/posts");
      } catch (err) {
        console.error("Failed to delete post", err);
        alert("Failed to delete post.");
      }
    }
  };

  const handleEdit = () => setShowModal(true);

  const handleSave = async () => {
    try {
      await updatePostAPI(id, formData);
      setPost((prev) => ({ ...prev, ...formData }));
      setShowModal(false);

      // ✅ عرض رسالة نجاح
      setAlertMessage("Post updated successfully!");
      setTimeout(() => setAlertMessage(""), 3000);
    } catch (err) {
      console.error("Failed to update post", err);
      alert("Failed to update post.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!post) return <p className="text-muted text-center">Loading post...</p>;

  return (
    <>
      {alertMessage && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {alertMessage}
          <button
            type="button"
            className="btn-close"
            onClick={() => setAlertMessage("")}
          ></button>
        </div>
      )}

      <div className="card shadow-lg border-0">
        <div className="card-body">
          <h2 className="card-title text-primary fw-bold mb-3">{post.title}</h2>
          <hr />
          <p className="card-text fs-5 text-dark">{post.content}</p>

          <div className="d-flex justify-content-between mt-4">
            <button onClick={handleEdit} className="btn btn-outline-success">
               Edit
            </button>
            <button onClick={handleDelete} className="btn btn-outline-danger">
               Delete
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal show fade d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "#00000080" }}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content border-0 shadow">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Edit Post</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label fw-semibold">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Title"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Content</label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    className="form-control"
                    rows="6"
                    placeholder="Content"
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer bg-light d-flex justify-content-between">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Close
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
