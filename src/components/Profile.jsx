import { useContext, useEffect, useState } from "react";
import { doctorContext } from "../store/contextX";
import axios from "axios";

function Profile() {
  const { OptionClicked, setOptionclicked } = useContext(doctorContext);
  

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(false);
  const [Fetch, SetFetch]=useState(false);
  const [DocDetail,setDocDetail]=useState(null);
  const [CurAvtar,SetCurAvtar]=useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false)
  
   useEffect(()=>{
    setOptionclicked("Profile");
    async function fun (){
     try {
      const response= await axios.get('https://healthmaster-4r73.onrender.com/api/v1/doctor/details',{withCredentials:true,headers: { "Content-Type": "httpOnly" }});
      const docDetailX=response.data.docDetail;
      console.log(docDetailX);
      setDocDetail(docDetailX);
      SetCurAvtar(docDetailX.doctorAvtar);
      SetFetch(true);

     } catch (error) {
      console.log(error);
      
     }
      
    }
    fun();
   },[uploadSuccess])
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // For previewing the image before uploading
    const filePreview = URL.createObjectURL(selectedFile);
    SetCurAvtar(filePreview);
    setPreview(true);

  };
  function handleCancel(){
    setPreview(false);
    SetCurAvtar(DocDetail.doctorAvtar);

  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file to upload");
      return;
    }

    // FormData is used to handle file uploads
    const formData = new FormData();
    formData.append("profilePicture", file);
    console.log(formData.get("profilePicture")); 

    try {
      // Send the form data with the profile picture to the backend
      const response = await axios.post(
        "https://healthmaster-4r73.onrender.com/api/v1/doctor/profile/upload",
        formData,
        {withCredentials:true, headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("File uploaded successfully:", response.data);
      setUploadSuccess(true);
      setPreview(false);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  return (
    <>
       {Fetch ? ( <div className="Profile-Box">
        <div className="doctorPersonalDetails">
          <div className="doctorPersonalDetails-item1">
            <div className="doctorPersonalDetails-item1-img">
              <img src={CurAvtar} alt="" />
              {preview &&  <button onClick={handleCancel}>&#10060;</button> }
             
            </div>
            <div className="doctorPersonalDetails-item1-file">
              <form onSubmit={handleSubmit} enctype="multipart/form-data">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <button type="submit">Upload</button>
                
              </form>
            </div>
          </div>
          <div className="doctorPersonalDetails-item2">
            <div className="doctorNameflexBox">
              <div className="firstnameX">
                <label htmlFor="">First Name :</label> <br />
                <p>{DocDetail.firstName}</p>
              </div>
              <div className="lastnmaeX">
                <label htmlFor="">Last Name</label> <br />
                <p>{DocDetail.lastName}</p>
              </div>
            </div>
            <div className="gen-X">
              <div className="gender-X">
                <label htmlFor="">Gender</label>
                <br />
                <p>{DocDetail.gender}</p>
              </div>
              <div className="phoneX">
                <label htmlFor="">PhoneNo:</label>
                <br />
                <p>9910549321</p>
              </div>
            </div>
            <div className="email-X">
              <label htmlFor="">Email:</label>
              <br />
              <p>{DocDetail.email}</p>
            </div>
          </div>
        </div>
        <div className="doctorSeheduleDetails">
          <div className="doctorProfssionDetails">
            <div className="dept-qualif">
              <div className="dept-qualif-item1">
                <label htmlFor="">Department :</label>

                <p>{DocDetail.department}</p>
              </div>
              <div className="dept-qualif-item2">
                <label htmlFor="">Qualifications:</label>

                <p>{DocDetail.qualifications}</p>
              </div>
            </div>

            <div className="experX">
              <label htmlFor=""> Experience :</label>
              <p>5 Yrs+</p>
            </div>
            {/* <div className="add-X">
              <label htmlFor=""> Address:</label>
              <p>Rani Bagh ,Pitampura ,Delhi-34</p>
            </div> */}
          </div>
        </div>
      </div>):(<div>wait</div>)}
     
    </>
  );
}

export default Profile;
