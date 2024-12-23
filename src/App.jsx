import { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

// import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/sidebar";
import Login from "./components/Login";
import Layout from "./Layout";
import { NavLogic } from "./store/logic";
import History from "./components/Appointment";
import Profile from "./components/Profile";
import Timing from "./components/Timings";
import Logout from "./components/Logout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Dashboard></Dashboard>,
        children: [],
      },
      {path:'/Appointment',
        element:<History></History>

      },
      {
        path:'/profile',
        element:<Profile></Profile>
      },
      {
        path:'/timings',
        element:<Timing></Timing>
      },
      {
        path:'/logout',
        element:<Logout></Logout>
        

      }
      
    ],
  },
  { path: "/login", element: <Login></Login> },
 
]);

function App() {
  const [count, setCount] = useState(0);
  const { GetAutheticated } = NavLogic();
  const [fetch, setFetch] = useState(true);

  // useEffect(() => {
  //   async function fun() {
  //     await GetAutheticated();
  //     setFetch(true);
  //   }
  //   fun();
  //   // console.log('lay:',isAuthenticated)
  //   setFetch(true);
  // }, []);

  return (
    <>
      {fetch ? (
        <RouterProvider router={router}></RouterProvider>
      ) : (
        <div>wait ....</div>
      )}
    </>
  );
}

export default App;
