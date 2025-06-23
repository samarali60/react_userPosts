import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createPostAPI } from "@/api/posts";
import { jwtDecode } from "jwt-decode";

export default function CreatePost() {
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      sections: [{ title: "", body: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections",
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const token =
        JSON.parse(localStorage.getItem("auth-store"))?.state?.token;

      const { id } = jwtDecode(token);

      const payload = {
        ...data,
        userId: id,
      };

      await createPostAPI(payload);

      reset();
      navigate("/posts");
    } catch (err) {
      console.error("Failed to create post", err);
    }
  };

  return (
    <div className="card p-4">
      <h3>Create New Post</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label>Title</label>
          <input className="form-control" {...register("title")} required />
        </div>
        <div className="mb-3">
          <label>Content</label>
          <textarea className="form-control" {...register("content")} required />
        </div>

        {/* <h5>Sections</h5>
        {fields.map((field, index) => (
          <div key={field.id} className="mb-3 border p-2 rounded">
            <input
              className="form-control mb-2"
              placeholder="Section Title"
              {...register(`sections.${index}.title`)}
            />
            <textarea
              className="form-control"
              rows={2}
              placeholder="Section Body"
              {...register(`sections.${index}.body`)}
            />
            <button
              type="button"
              className="btn btn-danger btn-sm mt-2"
              onClick={() => remove(index)}
            >
              Remove Section
            </button>
          </div>
        ))} */}
        {/* <button
          type="button"
          className="btn btn-secondary mb-3"
          onClick={() => append({ title: "", body: "" })}
        >
          + Add Section
        </button> */}

        <button className="btn btn-success align-self-end" type="submit">
          Submit Post
        </button>
      </form>
    </div>
  );
}
