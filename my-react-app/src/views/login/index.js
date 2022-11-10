import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [validate, setValidate] = useState({
    username: false,
    password: false,
  });

  const SubmitLoginForm = (e) => {
    e.preventDefault();
    username === "" && setValidate({ username: true });
    password === "" && setValidate({ password: true });
    if (username !== "" && password !== "") {
      axios
        .post("api/users/signIn", { username, password })
        .then((res) => {
          const { result, token } = res.data;
          if (result && token) {
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(result));
            navigate("/profile");
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
              value="Log In"
              onClick={(e) => SubmitLoginForm(e)}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
