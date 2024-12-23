import { createContext, useState } from "react";


export const doctorContext=createContext();

function DoctorProvider({children}){
    const [isAuthenticated,setAuthenticated]=useState(false);
    const [OptionClicked,setOptionclicked]=useState('Dashboard');

    


    return(
        <>
          <doctorContext.Provider value={{isAuthenticated,setAuthenticated,OptionClicked,setOptionclicked}}>
            {children}

          </doctorContext.Provider>
        
        
        </>
    )

}


export default DoctorProvider;