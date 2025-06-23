import { logInAndRegisterSchema } from "@/forms/schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerAPI } from "@/api/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register:formRegister,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(logInAndRegisterSchema),
  });

 const onSubmit = async (data) => {
   console.log("SENDING DATA:");
  for (const [key, value] of Object.entries(data)) {
    console.log(`${key}:`, value);
  }
  try {
    await registerAPI(data);
    setSuccessMessage("User created!");
    setErrorMessage("");
    setTimeout(() => navigate("/login"), 1500);
  } catch (e) {
    console.error("error:", e.response?.data || e.message);
    setErrorMessage("Registration failed");
  } finally {
    reset();
  }
};


  return (
   <div className="d-flex justify-content-center align-items-center vh-100 ">
  <div className="card shadow p-4" style={{ width: "100%", maxWidth: "500px" }}>
    <h3 className="text-center text-success mb-3">📝 Create New Account</h3>
    <p className="text-muted text-center mb-4">Join us and start sharing your thoughts.</p>

    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          className={`form-control ${errors.email ? "is-invalid" : ""}`}
          {...formRegister("email")}
          placeholder="you@example.com"
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
          {...formRegister("password")}
          placeholder="Enter password"
        />
        {errors.password && (
          <div className="invalid-feedback">{errors.password.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Full Name</label>
        <input
          type="text"
          className={`form-control ${errors.name ? "is-invalid" : ""}`}
          {...formRegister("name")}
          placeholder="Your Name"
        />
        {errors.name && (
          <div className="invalid-feedback">{errors.name.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Username</label>
        <input
          type="text"
          className={`form-control ${errors.username ? "is-invalid" : ""}`}
          {...formRegister("username")}
          placeholder="Unique username"
        />
        {errors.username && (
          <div className="invalid-feedback">{errors.username.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Phone</label>
        <input
          type="text"
          className={`form-control ${errors.phone ? "is-invalid" : ""}`}
          {...formRegister("phone")}
          placeholder="+20xxxxxxxxx"
        />
        {errors.phone && (
          <div className="invalid-feedback">{errors.phone.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Avatar URL</label>
        <input
          type="text"
          className={`form-control ${errors.avatar ? "is-invalid" : ""}`}
          {...formRegister("avatar")}
          placeholder="https://..."
        />
        {errors.avatar && (
          <div className="invalid-feedback">{errors.avatar.message}</div>
        )}
      </div>

      <div className="d-grid mt-4">
        <button className="btn btn-success" type="submit">
          Create My User
        </button>
      </div>

      {successMessage && (
        <div className="alert alert-success text-center mt-3">
           {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="alert alert-danger text-center mt-3">
           {errorMessage}
        </div>
      )}
    </form>
  </div>
</div>

  );
}
