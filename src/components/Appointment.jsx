import { useContext, useEffect, useState } from "react";
import AppointX from "./AppointSIngle";
import axios from "axios";
import { doctorContext } from "../store/contextX";

function History() {
  const [UpcomingAppointments, setUpcomingAppoinments] = useState([]);
  const [AppointmentDuration, setAppointmentDuration] = useState("Today");
  const [fetch, setFetch] = useState(false);
//   const [statusDuration, setStatusDuration] = useState('Today');
  const [ConfirmElement, setConfirmElement] = useState(false);
  const [ButtonAppoinmet, SetButtonAppoinmet] = useState("Upcoming");
  const [activeAppointmentId, setActiveAppointmentId] = useState(null);
  const {OptionClicked,setOptionclicked}=useContext(doctorContext);
 
  

  

  

  function handleDurationChnage(e) {
    console.log(e.target.value);
    setAppointmentDuration(e.target.value);
  }

  const handleSetActiveAppointment = (appointmentId) => {
    setActiveAppointmentId(appointmentId);
  };
  function handleUpcomingClick(e) {
    SetButtonAppoinmet("Upcoming");
    setAppointmentDuration('Today');
    const buttons = Array.from(document.getElementsByClassName("butt"));
    buttons.forEach((button) => {
      button.classList.remove("activeUpcomeing");
    });

    e.target.classList.add("activeUpcomeing");
  }

  function handleHistoryClick(e) {
    SetButtonAppoinmet("History");
    console.log('history')
    setAppointmentDuration('Today');

    const buttons = Array.from(document.getElementsByClassName("butt"));
    buttons.forEach((button) => {
      button.classList.remove("activeUpcomeing");
    });

    e.target.classList.add("activeUpcomeing");
  }

  async function fun() {
    try {
      const response = await axios.post(
        "https://healthmaster-4r73.onrender.com/api/v1/doctor/dotor-appointment",
        { AppointmentDuration, ButtonAppoinmet },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      const appointmentList = response.data.appoinments;
      // setAppointmentList(appointmentList);
      setUpcomingAppoinments(appointmentList);
      console.log(response.data);
      setFetch(true);

      // setFetch(true);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setOptionclicked('Appointment');
  
    fun();
  console.log('dsd',ButtonAppoinmet);
  }, [AppointmentDuration,ButtonAppoinmet]);

  return (
    <>
      {fetch ? (
        <div className="history-container">
          <div className="ongoing">
            <div className="upcome-completed-option">
              <div className="itemX-1">
                <button
                  onClick={handleUpcomingClick}
                  className="butt activeUpcomeing"
                >
                  Upcoming
                </button>{" "}
                <button className="butt" onClick={handleHistoryClick}>
                  History
                </button>
              </div>
              <div className="itemX-2">
                <select name="duration" id="" onChange={handleDurationChnage} value={AppointmentDuration}>
                  <option value="Today">Today</option>
                  <option value="Week">Week</option>
                  <option value="Month">Month</option>
                  <option value="Year">Year</option>
                  <option value="All-Time">All Time</option>
                </select>
              </div>
            </div>
          </div>
          <div className="upcomingBox">
            <div className="flexContainer">
              {UpcomingAppointments.map((appoint,index) => {
                console.log(index);
                return (
                  <AppointX
                    setConfirmElement={setConfirmElement}
                    activeAppointmentId={activeAppointmentId}
                    setActiveAppointment={handleSetActiveAppointment}
                    index={index} 
                    firstAppointment={index === 0} 
                    ConfirmElement={ConfirmElement}
                    appoint={appoint}
                    ButtonAppoinmet={ButtonAppoinmet}
                    fun={fun}
                  ></AppointX>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div>Loading ......</div>
      )}
    </>
  );
}

export default History;
