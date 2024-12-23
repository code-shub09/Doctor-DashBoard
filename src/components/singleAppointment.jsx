import girl from "../assets/woman.png";
import men from "../assets/men.png";

function SingleAppointment({ single }) {
//   console.log("sssdadegedt:");
//   console.log(single);


 
  return (
    <>
      <div className="singleAppoint">
        <div className="profileGender">
          {single.patientId.gender == "male" ? (
            <img src={men}></img>
          ) : (
            <img src={girl}></img>
          )}
        </div>
        <div className='patientNameX'>
          <span className="patientInfoX">{single.patientId.firstName + " " + single.patientId.lastName}</span>
          <br />
          <span className="patientInfo-genderX">{single.patientId.gender == "male" ?('M'):("F")}</span>
        </div>
        <div>
          <h5 className="patientInfo-time">{single.appointmentDate.time}</h5>
        </div>
      </div>
    </>
  );
}

export default SingleAppointment;
