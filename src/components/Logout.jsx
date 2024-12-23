import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout(){
    const navigator= useNavigate();
    useEffect(()=>{
        async function fun(){
             await axios.get('https://healthmaster-4r73.onrender.com/api/v1/doctor/logout',{withCredentials:true,headers:{"Content-Type":"httpOnly"}})
             navigator('/login')
        }
        fun();
    })
    
}

export default Logout;

