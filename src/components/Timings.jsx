import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { doctorContext } from "../store/contextX";

function Timing() {
  const [Timings, SetTimings] = useState(null);
  const [Fetched, setFetched] = useState(false);
  const {OptionClicked,setOptionclicked}=useContext(doctorContext);
  const [Clicked,SetClicked]=useState(false);

 
  const dayInput = useRef(null);
  const startTimeInput = useRef(null);
  const endTimeInput = useRef(null);
  const durTimeInput = useRef(null);

  async function handleAdd(e) {
    e.preventDefault();

    console.log("clicked");
    const data = {
      day: dayInput.current.value,
      startTime: startTimeInput.current.value,
      endTime: endTimeInput.current.value,
      duration: durTimeInput.current.value,
    };
    const responseData = await axios.post(
      "https://healthmaster-4r73.onrender.com/api/v1/doctor/timings/update",
      data,
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    const timeX = responseData.data.timings;
    SetTimings(timeX);
  }

  useEffect(() => {
    setOptionclicked('Timings');
    async function fun() {
      try {
        const responseData = await axios.get(
          "https://healthmaster-4r73.onrender.com/api/v1/doctor/timings",
          {
            withCredentials: true,
            headers: { "Content-Type": "httpOnly" },
          }
        );
        //   console.log(responseData.data.timings);
        const timeX = responseData.data.timings;
        SetTimings(timeX);
        console.log(Timings);
        setFetched(true);
      } catch (error) {
        console.log(error);
      }
    }
    fun();
  }, []);

  async function handldeDelete(dayX){
    console.log(dayX)
    const deleteData={
      day:dayX
    }
    const dataRes=await axios.post('https://healthmaster-4r73.onrender.com/api/v1/doctor/timings/delete',deleteData,{withCredentials:true, headers: { "Content-Type": "application/json" }});
   
    console.log('time---',dataRes);
    SetTimings(dataRes.data.timings);
   
  }

  return (
    <>
      {Fetched ? (
        <div className="timing-box">
         

          <div className="addTIming">
            <div className="label-divX">
              <div  className="label-add"> Select Day</div>
              <div  className="label-add">Start Time</div>
              <div  className="label-add">End Time</div>
              <div  className="label-add">Duration</div>
              <div  className="label-add"></div>
            </div>
            <form action="" className="timing-add-form">
              <select
                name="daysX"
                id=""
                className="addTiming-common-size"
                ref={dayInput}
                required
              >
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>

              <input
                type="time"
                className="addTiming-common-size"
                ref={startTimeInput}
                required
              />

              <input
                type="time"
                className="addTiming-common-size"
                ref={endTimeInput}
                required
              />

              <select name="" id="" className="addTiming-common-size" ref={durTimeInput}>
                <option value="10">10 min</option>
                <option value="20">20 min</option>
                <option value="30">30 min</option>
                <option value="45">45 min</option>
                <option value="60">60 min</option>
              </select>

              <button
                className="addTiming-common-size addButtX"
                type="submit"
                onClick={handleAdd}
              >
                {" "}
                Add
              </button>
            </form>
          </div>

          <div className="timng-table timing-table-common">
            <div className="timng-table-heading">
              <div className="timng-table-heading-item1">Day</div>
              <div className="timng-table-heading-item2">Start Time</div>
              <div className="timng-table-heading-item3">End TIme</div>
              <div className="timng-table-heading-item4">
                {" "}
                Consultation Time
              </div>
              <div className="timng-table-heading-item5"> Action</div>
            </div>
          </div>
          {Timings.map((item) => {
            return (
              <div className="data-fields timing-table-common" key={item.day}>
                <div className="timing-datafield1">{item.day}</div>
                <div className="timing-datafield2">{item.slots.startTime} </div>
                <div className="timing-datafield3">{item.slots.endTime}</div>
                <div className="timing-datafield4">{item.duration}</div>
                <div className="timing-datafield5">
                  <button className="delete-day" onClick={()=>{handldeDelete(item.day)}}>Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>Loading .....</div>
      )}
    </>
  );
}

export default Timing;
