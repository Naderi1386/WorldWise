import { useContext } from "react"
import { AuthContext } from "./FakeAuthContext"

export const useAuth=()=>{
    const context=useContext(AuthContext)
    if(context==undefined) throw new Error('You must use context inside the provider!')
    return context
}