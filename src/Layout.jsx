import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./components/sidebar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { doctorContext } from "./store/contextX";

function Layout() {
  const navigation = useNavigate();
  const { setAuthenticated } = useContext(doctorContext);
  const [fetch, setFetch] = useState(false);
  useEffect(() => {
    async function loginX() {
      try {
        const res = await axios.get(
          "https://healthmaster-4r73.onrender.com/api/v1/doctor/logged-in",
          { withCredentials: true, headers: { "Content-Type": "httpOnly" } }
        );
        console.log(res);
        if (res.data.success) {
          console.log("puja");
          setAuthenticated(true);
          setFetch(true);
        }
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 401) {
          // Redirect to login page if the doctor is not authenticated

          navigation("/login");
        }
      }
    }

    loginX();
  });
  return (
    <>
      {fetch ? (
        <div className="layout-box">
          <Sidebar />
          <div className="dynamic-child">
            <Outlet></Outlet>
          </div>
        </div>
      ) : (
        <div>wait....</div>
      )}
    </>
  );
}

export default Layout;
