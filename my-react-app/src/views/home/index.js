import axios from "axios";
import { useState, useEffect } from "react";

const Home = () => {
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    //   Fetching All Person Profile Data
    axios
      .get("http://localhost:8080/users/fetchAllUserDetail")
      .then((res) => {
        if (res.data.success) {
          setUserInfo([...res.data.data]);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="container">
      <div>
        <h1>All User Profile Details</h1>
      </div>
      {userInfo.length === 0 && <p>There is no user data available</p>}
      {userInfo.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Bio Data</th>
              <th>Profile Pic</th>
            </tr>
          </thead>
          <tbody>
            {userInfo &&
              userInfo.map(
                (elm, i) =>
                  (elm?.name || elm?.biodata || elm?.profile_pic) && (
                    <tr key={i}>
                      <th>{i + 1}</th>
                      <td>{elm.name !== "undefined" ? elm.name : ""}</td>
                      <td>{elm.biodata !== "undefined" ? elm.biodata : ""}</td>
                      <td>
                        {" "}
                        <img
                          src={elm.profile_pic}
                          alt={elm.profile_pic}
                          style={{ width: "50px" }}
                        />{" "}
                      </td>
                    </tr>
                  )
              )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
