import React, { useState } from "react";

export const AuthContext = React.createContext({})

export const AuthProvider = (props) =>{
    const [CPF,setCPF] = useState('')
    const [Foto,setFoto] = useState('')
    
    return(
        <AuthContext.Provider value={{CPF,setCPF,Foto,setFoto}}>
            {props.children}
        </AuthContext.Provider>
    )
}


