import { ReactNode, useEffect } from "react"
import { useAuth } from "../components/Contexts/useAuth"
import { useNavigate } from "react-router-dom"

 interface ProtectedRoutPropType{
    children:ReactNode
 }
const ProtectedRoute = ({children}:ProtectedRoutPropType) => {
    const {isAuthenticated}=useAuth()
    const navigate=useNavigate()

    useEffect(()=>{
        if(!isAuthenticated) navigate('/')
    },[isAuthenticated,navigate])
  return children
}

export default ProtectedRoute