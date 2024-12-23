import { useEffect, useState } from "react";
import docImg from "../assets/report3.png";
import sorry1 from "../assets/sorry1.png";
import sorry from "../assets/sorry2.png";
import axios from "axios";
import SingleAppointment from "./singleAppointment";
import { doctorContext } from "../store/contextX";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import DonutChart from "../store/Donut";

function Dashboard() {
  const todayDate = new Date();
  const {OptionClicked,setOptionclicked}=useContext(doctorContext);
  

  const [status,setStatus]=useState([]);

  const [appointmentList, setAppointmentList] = useState([]);
  const { isAuthenticated, setAuthenticated } = useContext(doctorContext);
  const navigate = useNavigate();
  const [fetch, setFetch] = useState(false);
  const [LastAppointmentList,SetLastAppointmentList]=useState([]);

  const [doctor, setDoctor] = useState(null);
  useEffect(() => {
    // console.log('check:',isAuthenticated)
    setOptionclicked('Dashboard');
    if (!isAuthenticated) {
      console.log('check:',isAuthenticated)
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    async function fun() {
      console.log('fun')
      try {
       
        const response = await axios.get(
          "https://healthmaster-4r73.onrender.com/api/v1/doctor/dotor-appointment-last-today",
          {
            withCredentials: true,
            headers: { "Content-Type": "httpOnly" },
          }
        );
        console.log('lastday')


        const appointmentList = response.data.data;

        console.log(appointmentList);
        let completed=0;
        let absent=0;
        let cancel=0;
        let arr=[];
        for (let index = 0; index < appointmentList.lastDayAppointments.length; index++) {
          if(appointmentList.lastDayAppointments[index].status=='Completed'){
            completed++;
          }
           if (appointmentList.lastDayAppointments[index].status=='Reject') {
            cancel++;
            
           }
           if (appointmentList.lastDayAppointments[index].status=='Absent') {
            
            absent++;
           }
           if (appointmentList.lastDayAppointments[index].status=='Not Completed') {
            
            absent++;
           }

          
          
        }
        const totalLastAppointX=completed+absent+cancel;
        completed=(completed/totalLastAppointX)*100;
        absent=(absent/totalLastAppointX)*100;
        cancel=(cancel/totalLastAppointX)*100;
        arr.push(completed);
        arr.push(absent);
        arr.push(cancel);
        setStatus(arr);
        console.log(completed,'com',absent);
        setAppointmentList(appointmentList.todayAppointments);
        SetLastAppointmentList(appointmentList.lastDayAppointments);
        console.log(appointmentList.lastDayAppointments)
        // console.log(response.data.doctor);
        // setDoctor(response.data.doctor);
        setFetch(true);
      } catch (error) {
        console.log(error);
      }
    }
    fun();
  }, []);
  const today = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = today.toLocaleDateString("en-IN", options);

  return (
    <>
      {fetch ? (
        <div className="dash-box">
          <div className="head-home item-1">
            <div>DashBoard</div>
            <div className="dashDate">{formattedDate}</div>
          </div>
          <div className="main-home item-2">
            <div className="greet">
              <div className="greet-title">
                <span className="welX">Welcome</span>
                {/* <span className="docName">{"  " + doctor.firstName + "!"}</span> */}
                <p className="noPateints">
                  you have{" "}
                  <span className="highlightX">
                    {appointmentList.length} patients{" "}
                  </span>{" "}
                  remaining today!
                </p>
                <p className="noPateints2">
                  Remember to check the documenetation before the call
                </p>
              </div>
              <div className="head-home-img">
                <img src={docImg} alt="" />
              </div>
            </div>
          </div>

          <div className="appointmentListDoc item-3">
            <div className="detailAppoint">
              <h3>Today Appointment</h3>
              <div className="detailAppoint-inner">
              {appointmentList.length ? (
                <div className="appoint-child">
                  {appointmentList.map((appoint) => {
                    console.log("adas", appoint);
                    if (appoint.status=='Pending') {
                      return (
                        <SingleAppointment single={appoint}></SingleAppointment>
                      );
                      
                    }
                    return;
                  })}
                </div>
              ) : (
                <div className="soory-last">
                  <img src={sorry} alt="" />
                  <p className="zeroX">
                     No ! Appointment Today
                  </p>
                </div>
              )}

              </div>
             
            </div>
            <div className="chart-section">
              <h3>Last Day</h3>
              {LastAppointmentList.length ?(<DonutChart arr={status}></DonutChart>):(<div className="soory-last"><img src={sorry1} alt="" /><h4> No ! Appointment Last Day</h4></div>)}
              
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default Dashboard;

{
  /* <p className="soory"> sorry! </p>
                    <p className="zeroX">
                      <span>0</span> Appointment Today
                    </p> */
}
