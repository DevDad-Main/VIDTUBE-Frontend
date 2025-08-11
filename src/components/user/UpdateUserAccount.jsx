import { useState } from "react";
import { useNavigate } from "react-router";
import { updateData } from "../utils";

function UpdateUserAccount() {
  document.title = 'VideoTube - Update account'

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    fullname: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let data = await updateData(
      "users/update-account",
      { ...formData },
      "PATCH"
    );
    if (data) {
      navigate("/");
    }
  };
  return (
    <div className="flex-center pt-7">
      <form onSubmit={onSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Update details</legend>

          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            placeholder="Email"
            name="email"
            onChange={handleInput}
            value={formData.email}
          />

          <label className="label">Fullname</label>
          <input
            type="text"
            className="input"
            placeholder="Full name"
            name="fullname"
            onChange={handleInput}
            value={formData.fullname}
          />

          <button className="btn btn-neutral mt-4" type="submit">
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default UpdateUserAccount;
