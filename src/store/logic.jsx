import axios from "axios";
import { useContext } from "react";
import { doctorContext } from "./contextX";


export function NavLogic(){
    const {  isAuthenticated, setAuthenticated } =
    useContext(doctorContext);
  
     async function GetAutheticated(){
        try {
            const res=await axios.get('https://healthmaster-4r73.onrender.com/api/v1/doctor/doctor-auth',{withCredentials:true,headers:{"Content-Type":"application/json"}});
             
             console.log(res.data);

            if (res.data.success) {
                setAuthenticated(true);
                console.log('diwwwwwali');
                
            }
            console.log('okkkkk')
            
            
         
        } catch (error) {

         console.log('errrrr',error)
         setAuthenticated(false)
 
         
        }

     }
     function getAge(dob) {
        // Convert the dob (date of birth) string to a Date object
        const birthDate = new Date(dob);
        const today = new Date();
    
        // Calculate the difference in years
        let age = today.getFullYear() - birthDate.getFullYear();
    
        // Adjust the age if the birthdate hasn't occurred yet this year
        const monthDifference = today.getMonth() - birthDate.getMonth();
        const dayDifference = today.getDate() - birthDate.getDate();
    
        if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
            age--; // Subtract one if the birthday hasn't happened yet this year
        }
    
        return age;
    }

    return {
        GetAutheticated,
        getAge

    }

   
}