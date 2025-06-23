import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { logInAPI } from "@/api/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import * as yup from "yup";
import { useAuthStore } from "@/store/auth";

const loginSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password too short")
    .required("Password is required"),
});

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation(); // ✅
  const [errorMessage, setErrorMessage] = useState("");
  const { setTokens } = useAuthStore();
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await logInAPI(data);
      const { token, refreshToken } = res.data;
      setTokens({ token, refreshToken });

      setShowSuccess(true); // ✅ نعرض الـ alert

      setTimeout(() => {
        setShowSuccess(false); // ✅ نخفيه بعد شوية
        navigate("/profile");
      }, 2000);
      // ✅ Redirect smartly
      // const params = new URLSearchParams(location.search);
      // const redirectTo = params.get("redirectTo") || "/";
      // navigate(redirectTo);

      setErrorMessage("");
    } catch (err) {
      console.error(err);
      setErrorMessage("Invalid login credentials");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-60">
      <div
        className="card shadow p-4"
        style={{ width: "100%", maxWidth: "450px" }}
      >
        <h3 className="text-center text-success mb-3">
          🔐 Login to Your Account
        </h3>
        <p className="text-muted text-center mb-4">
          Welcome back! Please enter your credentials.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              {...register("email")}
              placeholder="name@example.com"
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              {...register("password")}
              placeholder="Enter password"
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>

          <div className="d-grid mt-4">
            <button className="btn btn-success" type="submit">
              Login
            </button>
          </div>

          {errorMessage && (
            <div className="alert alert-danger mt-3 text-center">
              {errorMessage}
            </div>
          )}

          {showSuccess && (
            <div className="alert alert-success mt-3 text-center">
              ✅ Login successful! Redirecting...
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
