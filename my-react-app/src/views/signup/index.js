import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import "./signup.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [validate, setValidate] = useState({
    username: false,
    password: false,
  });

  const SubmitRegisterForm = (e) => {
    e.preventDefault();
    username === "" && setValidate({ username: true });
    password === "" && setValidate({ password: true });
    if (username !== "" && password !== "") {
      axios
        .post("http://localhost:8080/users/signup", { username, password })
        .then((res) => {
          const { success, message, result } = res.data;
          if (success) {
            toastr.success(message);
            navigate("/login");
          }
        })
        .catch((error) => toastr.error(error?.response?.data?.error));
    }
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div id="formContent">
          <form className="form-temp">
            <input
              type="text"
              id="login"
              className="second"
              name="login"
              placeholder="username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            {validate.username && (
              <p style={{ color: "red" }}>Username Is Required</p>
            )}
            <input
              type="password"
              id="password"
              className="third"
              name="login"
              placeholder="password"
              min={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {validate.password && (
              <p style={{ color: "red" }}>Password Is Required</p>
            )}
            <input
              type="submit"
              className="fourth"
              value="Register"
              onClick={(e) => SubmitRegisterForm(e)}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
