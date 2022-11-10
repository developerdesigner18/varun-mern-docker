import axios from "axios";
import { useEffect, useState } from "react";
import "./profile.css";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const Profile = () => {
  const [user, setUser] = useState({ name: "", biodata: "", profile_pic: "" });
  const [img, setImg] = useState();

  const FetchUserProfileInformation = () => {
    const userData = localStorage.getItem("user");
    const convert = JSON.parse(userData);
    const { name, biodata, profile_pic } = convert;
    setUser({ name, biodata, profile_pic });
  };

  const UpdateProfile = (e) => {
    e.preventDefault();
    const { name, biodata, profile_pic } = user;
    const form = new FormData();
    name && form.append("name", name);
    biodata && form.append("biodata", biodata);
    profile_pic && form.append("profile_pic", profile_pic);
    axios
      .put("api/users/insertUserDetail", form, {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        const { message, success, result } = res.data;
        if (success) {
          localStorage.removeItem("user");
          localStorage.setItem("user", JSON.stringify(result));
          toastr.success(message);
        }
      })
      .catch((error) => console.log(error));
  };

  const SetData = (e) => {
    let data = { ...user, [e.target.name]: e.target.value };
    setUser(data);
  };

  const handleFile = (e) => {
    const url = URL.createObjectURL(e.target.files[0]);
    setImg(url);
    setUser({ ...user, profile_pic: e.target.files[0] });
  };

  useEffect(() => {
    FetchUserProfileInformation();
  }, []);

  return (
    <div className="container">
      <form className="form-inline">
        <div className="form-group pb-1">
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user?.name}
            onChange={(e) => SetData(e)}
          />
        </div>
        <div className="form-group pb-2">
          <label htmlFor="biodata">Bio data:</label>
          <textarea
            className="form-control"
            id="biodata"
            name="biodata"
            value={user?.biodata}
            cols={5}
            rows={2}
            onChange={(e) => SetData(e)}
          />
        </div>
        <div className="form-group pb-1">
          <label htmlFor="profile_pic">Profile Pic:</label> &nbsp;
          {(img || user?.profile_pic) && (
            <img
              id="profile_pic"
              name="profile_pic"
              src={img ? img : user?.profile_pic}
              alt="ima"
              style={{ width: "100px" }}
            />
          )}
          &nbsp;
          <input type="file" id="file" onChange={handleFile} />
        </div>
        <br></br>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => UpdateProfile(e)}
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
