import { useAuthStore } from "@/store/auth";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const { token, clear } = useAuthStore();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isActive = (path) => pathname === path ? "active fw-bold text-primary" : "";

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <Link className="navbar-brand text-primary fw-bold fs-4" to="/">
           MyBlog
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${isActive("/posts")}`} to="/posts">
                Posts
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive("/profile")}`} to="/profile">
                Profile
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav">
            {token ? (
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link text-danger"
                  onClick={() => {
                    if (confirm("Are you sure you want to log out?")) {
                    clear();
                    navigate("/login");
                    }
                  }}
                >
                  Log Out
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className={`nav-link ${isActive("/login")}`} to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${isActive("/register")}`} to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
