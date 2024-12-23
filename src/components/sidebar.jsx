import { Link } from "react-router-dom";
import hosLogo from "../assets/image.png";
import SideBarOption from "./SideBarOption";
import { useState } from "react";
function Sidebar() {

  // const [OptionClicked,setOptionclicked]=useState('Dashboard');
  function handleClick(e){

      const liX=document.getElementsByClassName('li-x');

      liX.classList.remove('active');
      e.target.classList.add('active');




  }




  return (
    <div className="sidebar-box">
      <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark full-height-sidebar">
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <img
            src={hosLogo}
            className="hos-logo"
            style={{ fontSize: "1.5rem" }}
          />
          <span className="fs-4 option-dashboard">Doctor</span>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto custum-ul">
         
          <SideBarOption linkX={'/'} optionName={'Dashboard'} classNameX={"bi bi-house me-2 custIcon"}  ></SideBarOption>
          <SideBarOption linkX={'/Appointment'} optionName={'Appointment'}  classNameX={"bi bi-calendar-plus-fill me-2 custIcon"} ></SideBarOption>
          <SideBarOption linkX={'/timings'} optionName={'Timings'} classNameX={"bi bi-calendar3  me-2 custIcon"} ></SideBarOption>
          <SideBarOption linkX={'/profile'} optionName={'Profile'} classNameX={"bi bi-person-circle  me-2 custIcon"} ></SideBarOption>
          <SideBarOption linkX={'/logout'} optionName={'Logout'} classNameX={"bi bi-box-arrow-left me-2 custIcon"} ></SideBarOption>
        </ul>
        <hr />
        <div className="dropdown">
          <a
            href="#"
            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <strong>mdo</strong>
          </a>
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
            <li>
              <a className="dropdown-item" href="#">
                New project...
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Profile
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
