import { jwtDecode } from "jwt-decode";
import { APIClient } from ".";

export const getMe = async () => {
  const { token } = JSON.parse(localStorage.getItem("auth-store"))?.state ?? {};
  if (!token) throw new Error("No token found");

  const { id } = jwtDecode(token);
  return APIClient.get(`/users/${id}`);
};
export const updateUser = async (id, data) => {
  return APIClient.put(`/users/${id}`, data);
};
