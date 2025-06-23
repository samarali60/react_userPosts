import * as yup from "yup";
export const logInAndRegisterSchema = yup.object({
  email: yup
    .string()
    .email("please enter avalid email")
    .required("the email is required for registration"),

  password: yup
    .string()
    .min(8, "please make sure the password is more then 7 char")
    .required("the password is required for registration"),

  name: yup
    .string()
    .min(2, "name must be at least 2 characters")
    .required("name is required"),

  username: yup
    .string()
    .min(3, "username must be at least 3 characters")
    .required("username is required"),

  phone: yup
    .string()
    .matches(/^\d{10,15}$/, "please enter a valid phone number")
    .required("phone is required"),

  avatar: yup
    .string()
    .url("please enter a valid URL")
    .required("avatar URL is required"),
});
