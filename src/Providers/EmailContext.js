import React, { useState } from "react";

export const EmailContext = React.createContext({})


export const EmailProvider = (props) =>{
    const [Hospitais,setHospitais] = useState('')
    const [Email,setEmail] = useState('')
    const [Foto,setFoto] = useState('')
    const [Distancias,setDistancias] = useState([])
    const [Cpf,setCpf] = useState('')
    const [id,setId] = useState('')

    return(
        <EmailContext.Provider value={{Email,setEmail,Hospitais,setHospitais,Foto,setFoto,Distancias,setDistancias,Cpf,setCpf,id,setId}}>
            {props.children}
        </EmailContext.Provider>
        
    )
}

