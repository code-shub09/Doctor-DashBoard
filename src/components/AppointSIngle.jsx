import anime1 from "../assets/profile2.png";
import anime2 from "../assets/profile3.png";
import anime3 from "../assets/profile4.png";
import anime5 from "../assets/profile5.png";
import anime6 from "../assets/profile6.png";
import anime7 from "../assets/profile7.png";
import girl1 from "../assets/girl1.png";
import girl2 from "../assets/girl2.png";
import girl3 from "../assets/girl3.png";
import girl4 from "../assets/girl4.png";
import girl5 from "../assets/girl5.png";
import girl6 from "../assets/girl6.png";
import girl7 from "../assets/girl7.png";
import { NavLogic } from "../store/logic";
import { useEffect, useState } from "react";
import axios from "axios";

function AppointX({
  appoint,

  activeAppointmentId,
  setActiveAppointment,
  index,
  firstAppointment,
  fun,
  ButtonAppoinmet,
}) {
  const animeImages = [anime1, anime2, anime3, anime5, anime6, anime7];
  const girlImages = [girl1, girl2, girl3, girl4, girl5, girl6, girl7];
  //   const [showConfirmButton, setShowConfirmButton] = useState(false);

  const [randomImage, setRandomImage] = useState(null);
  const [AppointmentStatus, SetAppointmentStatus] = useState("Pending");

  // Use useEffect to ensure randomImage is only generated once (on initial render)
  useEffect(() => {
    const getRandomAnimeImage = () => {
      const randomIndex = Math.floor(Math.random() * animeImages.length);
      return animeImages[randomIndex];
    };

    const getRandomGirlImage = () => {
      const randomIndex = Math.floor(Math.random() * girlImages.length);
      return girlImages[randomIndex];
    };

    // Set the random image when the component first mounts
    if (!randomImage) {
      if (appoint.patientId.gender == "male") {
        console.log("male");
        setRandomImage(getRandomAnimeImage());
      } else {
        console.log("fema");
        setRandomImage(getRandomGirlImage());
      }
    }
  }, [randomImage, animeImages]);
  const { getAge } = NavLogic();
  const age = getAge(appoint.patientId.dob);

  function handleChnageSelect(e) {
    // setConfirmElement(appoint._id);
    if (e.target.value == "Pending") {
      setActiveAppointment(null);
    } else {
      setActiveAppointment(appoint._id);
      SetAppointmentStatus(e.target.value);
    }
  }

  async function handleClickConfirm() {
    // const eleX=document.getElementById(appoint._id);

    let UpdatedAppointment = appoint;



    // console.log(eleX);
    console.log(AppointmentStatus);
    console.log("Confirmed appointment:", appoint._id);
    UpdatedAppointment.status = AppointmentStatus;
    const dataX = {
      idX: appoint._id,
      statusX: AppointmentStatus,
    };
    console.log(UpdatedAppointment);
    try {
      const res = await axios.post(
        "https://healthmaster-4r73.onrender.com/api/v1/doctor/doctor-appoint-status-updated",
        dataX,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      fun();
    } catch (error) {}
  }

  let dateX = appoint.appointmentDate.date;
  const dateObj = new Date(dateX);
  const dateOnly = dateObj.toISOString().split("T")[0];
  return (
    <>
      <div className="single-appoint-box">
        <div className="patient-img">
          <img src={randomImage} alt="" />
        </div>
        <div className="patient-details">
          <div className="patient-details-flex">
            <div className="patient-details-flex-child patientNameDoc">
              {" "}
              {appoint.patientId.firstName +
                " " +
                appoint.patientId.lastName}{" "}
            </div>
            <div className="patient-details-flex-child genderX">
              <span className="gender-mdX"> {appoint.patientId.gender} </span>
              {appoint.patientId.gender == "Female" ? (
                <span className="femaleX">F</span>
              ) : (
                <span className="maleX">M</span>
              )}
            </div>
            <div className="patient-details-flex-child">
              {" "}
              {age + " " + "yrs"}{" "}
            </div>
            <div className="patient-details-flex-child dateXX"> {dateOnly} </div>

            <div className="patient-details-flex-child timeX">
              {appoint.appointmentDate.time}
            </div>
          </div>
        </div>
        <div className="appoint-status">
          {ButtonAppoinmet == "Upcoming" ? (
            <div className="appoint-status-flex">
              <select
                name="status"
                id=""
                className="appoint-select"
                onChange={handleChnageSelect}
              >
                <option value="Pending">Pending</option>
                {firstAppointment && (
                  <>
                    <option value="Completed">Completed</option>{" "}
                    <option value="Unattended">Absent</option>
                  </>
                )}

                <option value="Reject">Reject</option>
              </select>
              {activeAppointmentId === appoint._id && (
                <button
                  className="butt-confirm-active"
                  id={appoint._id}
                  onClick={handleClickConfirm}
                >
                  Confirm
                </button>
              )}
            </div>
          ) : (
            <div className="history-status">{appoint.status}</div>
          )}
        </div>
      </div>
    </>
  );
}
export default AppointX;
