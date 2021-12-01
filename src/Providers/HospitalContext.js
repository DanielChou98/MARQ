import React, { useState } from "react";

export const HospitalContext = React.createContext({})

export const HospitalProvider = (props) =>{
    const [Hospital,setHospital] = useState('')
    return(
        <HospitalContext.Provider value={{Hospital,setHospital}}>
            {props.children}
        </HospitalContext.Provider>
    )
}
