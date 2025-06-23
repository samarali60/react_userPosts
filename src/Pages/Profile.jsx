import { useEffect, useState } from "react";
import { getMe, updateUser } from "@/api/user";
import { useForm } from "react-hook-form";
import { User, Mail, Phone, Image, Pencil } from "lucide-react";


export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMe();
        setUser(res.data);
        reset(res.data); // نملأ الفورم ببيانات المستخدم
      } catch (err) {
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [reset]);

  const onSubmit = async (data) => {
    try {
      const res = await updateUser(user.id, data);
      setUser(res.data);
      setEditMode(false);
    } catch (err) {
      setError("Update failed.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="card shadow border-0 text-center h-100">
      <div className="card-body h-100">
        {/* <h4 className="card-title">User Profile</h4> */}

        {editMode ? (
          <form onSubmit={handleSubmit(onSubmit)} className="text-start">
            <div className="mb-2">
              <label>Name:</label>
              <input className="form-control" {...register("name")} />
              <p className="text-danger">{errors?.name?.message}</p>
            </div>
            <div className="mb-2">
              <label>Email:</label>
              <input className="form-control" {...register("email")} />
              <p className="text-danger">{errors?.email?.message}</p>
            </div>
            <div className="mb-2">
              <label>Username:</label>
              <input className="form-control" {...register("username")} />
            </div>
            <div className="mb-2">
              <label>Phone:</label>
              <input className="form-control" {...register("phone")} />
            </div>
            <div className="mb-2">
              <label>Avatar URL:</label>
              <input className="form-control" {...register("avatar")} />
            </div>

            <div className="d-flex gap-2 mt-3">
              <button className="btn btn-success" type="submit">
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <img
              src={user.avatar}
              alt="Avatar"
              width={100}
              className="rounded-circle mb-3"
            />
            <p > <User className="me-2" color="#007BFF"/>  My name : {user.name}</p>
            <p><Mail className="me-2" color="#007BFF"/>  My email : {user.email}</p>
            <p><Phone className="me-2" color="#007BFF" />  My phone : {user.phone}</p>
            <p> <User className="me-2" color="#007BFF"/>  My username : {user.username}</p>

            <button
              className="btn btn-outline-primary mt-2"
              onClick={() => setEditMode(true)}
            >
              Edit Profile
              <Pencil className="mx-2" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
