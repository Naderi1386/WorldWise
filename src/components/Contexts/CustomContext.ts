import { useContext } from "react"
import { ContextCity } from "./Context"

const useCities=()=>{
    const context=useContext(ContextCity)
    if(context==undefined)throw new Error('You must use context inside the context provider!')
    return context
}
export default useCities